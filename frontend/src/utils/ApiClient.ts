// This file responsible for fetching the data from the backend
import { z } from "zod";

const API_URL = "http://127.0.0.1:8000/electricity_management/api/";
const MAX_TIMEOUT = 60_000; // 1 min
const REASON_TIMEOUT = "TIMED OUT";
const REASON_OFFLINE = "OFFLINE";

export enum ClientSideErrorCodes {
  UNEXPECTED = -1, // something unexpected happened
  PARSING = -2, // if the "zod" parser has thrown an error
  TIMEOUT = -3, // if the request was pending for more than MAX_TIMEOUT
  ABORT = -4, // e.g. if resource was not required anymore
  OFFLINE = -5, // e.g. if the user is offline
}

export enum HTTPMethod {
  // Note: We need to use uppercase here.
  GET = "GET",
  DELETE = "DELETE",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
}

export type Endpoint<RESPONSE, BODY, PATH_PARAMS, QUERY_PARAMS> = {
  method: HTTPMethod;
  path: PATH_PARAMS extends void ? string : (params: PATH_PARAMS) => string;
  parser: (json: any) => RESPONSE;
  __typeKeep?: BODY | QUERY_PARAMS; // this property will not be used, but is required for TypeScript
};

export type FieldViolation = {
  field: string;
  description: string;
};

type ErrorDetail = {
  "@type"?: any;
};

type ErrorInfo = ErrorDetail & {
  "@type": string;
  reason: string;
  domain: string;
  metadata: Record<string, string | undefined>;
};

type BadRequest = ErrorDetail & {
  "@type": `type.googleapis.com/google.rpc.BadRequest`;
  fieldViolations?: FieldViolation[];
};

export class APIError extends Error {
  code: number;
  statusText: string;
  reason?: string;
  metadata: Record<string, string | undefined>;
  fieldViolations: FieldViolation[];

  constructor(
    code: number,
    statusText: string,
    json: { message?: string; details?: ErrorDetail[] } = {},
  ) {
    // we favor json.message over statusText if provided
    const text = json.message || statusText;

    const errorInfo = json.details?.find(
      (element) => element["@type"] === "ErrorInfo",
    ) as ErrorInfo | undefined;

    const badRequest = json.details?.find(
      (element) => element["@type"] === "BadRequest",
    ) as BadRequest | undefined;

    // fallback to undefined if reason is empty
    const reason = errorInfo?.reason || undefined;
    super(`APIError (${code}): ${text}${reason ? ` (reason: ${reason})` : ""}`);
    Error.captureStackTrace?.(this, APIError);

    this.name = this.constructor.name;
    this.code = code;
    this.statusText = text;
    this.reason = reason;
    this.metadata = errorInfo?.metadata || {};
    this.fieldViolations = badRequest?.fieldViolations || [];
  }
}
const convertToAPIError = (err: Error | APIError) => {
  if (err instanceof APIError) throw err;
  if (err instanceof z.ZodError)
    throw new APIError(
      ClientSideErrorCodes.PARSING,
      JSON.stringify(err.issues),
    );
  throw new APIError(ClientSideErrorCodes.UNEXPECTED, err.message);
};

// related:
// - https://github.com/whatwg/fetch/issues/905
// - https://github.com/whatwg/dom/issues/920#issuecomment-726203604
const getTimeoutController = (
  timeLimit: number,
  signal?: AbortSignal,
): { signal: AbortSignal; cleanup: () => void } => {
  // early escape (if already aborted, just forward that signal)
  if (signal?.aborted) return { signal, cleanup: () => undefined };

  const ctrl = new AbortController();
  const timeout = setTimeout(() => ctrl.abort(REASON_TIMEOUT), timeLimit);
  if (signal) {
    signal.addEventListener("abort", () => ctrl.abort(signal.reason), {
      signal: ctrl.signal,
      once: true,
    });
  }
  return { signal: ctrl.signal, cleanup: () => clearTimeout(timeout) };
};

const camelToSnakeCase = (str: string) =>
  str.replace(/[A-Z]/g, (letter: string) => `_${letter.toLowerCase()}`);

const encodeQueryParam = (name: string, value: unknown) =>
  `${encodeURIComponent(camelToSnakeCase(name))}=${encodeURIComponent(String(value))}`;

const flattenParams = (
  params: Record<string, unknown>,
  prefix = "",
): [key: string, value: unknown][] =>
  Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null)
    .flatMap<[string, unknown]>(([key, value]) =>
      Array.isArray(value)
        ? value.map<[string, unknown]>((item) => [prefix + key, item])
        : typeof value === "object"
          ? flattenParams(value as Record<string, unknown>, prefix + key + ".")
          : [[prefix + key, value]],
    );

const encodeQueryParams = (params: Record<string, unknown>): string =>
  flattenParams(params)
    .map(([key, value]) => encodeQueryParam(key, value))
    .join("&");

const fetchParsedResponse = async <
  RESPONSE,
  BODY = void,
  PATH_PARAMS = void,
  QUERY_PARAMS = void,
>({
  endpoint,
  queryParams,
  body,
  pathParams,
  signal,
  timeout = MAX_TIMEOUT,
}: {
  endpoint: Endpoint<RESPONSE, BODY, PATH_PARAMS, QUERY_PARAMS>;
  queryParams?: QUERY_PARAMS;
  body?: BODY;
  pathParams?: PATH_PARAMS;
  signal?: AbortSignal;
  timeout?: number;
  noLoadingIndicator?: boolean;
}): Promise<RESPONSE> => {
  if (!window.navigator.onLine) {
    throw new APIError(ClientSideErrorCodes.OFFLINE, REASON_OFFLINE);
  }
  const ctrl = getTimeoutController(timeout, signal);
  try {
    const path = `${API_URL}${typeof endpoint.path === "function" ? endpoint.path(pathParams as PATH_PARAMS) : endpoint.path}`;
    const query = queryParams && encodeQueryParams(queryParams);
    const url = path + (query ? "?" + query : "");

    const headers = {
      "Content-Type": "application/json",
    };

    return await fetch(url, {
      method: endpoint.method,
      body: JSON.stringify(body),
      headers,
      signal: ctrl.signal,
    }).then(async (response) => {
      if (!response.ok) {
        throw new APIError(
          response.status,
          response.statusText,
          await response.json().catch(() => undefined),
        );
      }
      const res = await response.json();
      return endpoint.parser(res);
    });
  } catch (e) {
    if (ctrl.signal.aborted) {
      throw ctrl.signal.reason === REASON_TIMEOUT
        ? new APIError(ClientSideErrorCodes.TIMEOUT, REASON_TIMEOUT)
        : new APIError(ClientSideErrorCodes.ABORT, ctrl.signal.reason);
    }
    throw convertToAPIError(e as Error);
  } finally {
    ctrl.cleanup();
  }
};

export const ApiClient = { fetch: fetchParsedResponse };
