import { z } from "zod";
import { ApiClient, Endpoint, HTTPMethod } from "../utils/ApiClient";

const electricityUnitSchema = z.union([
  z.literal("kWh"),
  z.literal("MWh"),
  z.literal("GJ"),
]);

export type ElectricityUnit = z.infer<typeof electricityUnitSchema>;

const ElectricitySchema = z.object({
  amount: z.number(),
  date: z.string(),
  unit: electricityUnitSchema,
});

export type Electricity = z.infer<typeof ElectricitySchema>;

const ListElectricityResponseSchema = z.array(ElectricitySchema);
export type ListElectricityResponse = z.infer<
  typeof ListElectricityResponseSchema
>;

type ListElectricityQueryParams = {
  from?: Date;
  to?: Date;
};

const ListElectricityEndpoint: Endpoint<
  ListElectricityResponse,
  void,
  void,
  ListElectricityQueryParams
> = {
  method: HTTPMethod.GET,
  path: "electricity/",
  parser: ListElectricityResponseSchema.parse,
};

const list = (params: ListElectricityQueryParams) =>
  ApiClient.fetch<
    ListElectricityResponse,
    void,
    void,
    ListElectricityQueryParams
  >({
    endpoint: ListElectricityEndpoint,
    queryParams: params,
  });

const CreateElectricityRequestSchema = ElectricitySchema;
type CreateElectricityRequest = z.infer<typeof CreateElectricityRequestSchema>;

const CreateElectricityResponseSchema = ElectricitySchema;
type CreateElectricityResponse = z.infer<
  typeof CreateElectricityResponseSchema
>;

const CreateElectricityEndpoint: Endpoint<
  CreateElectricityResponse,
  CreateElectricityRequest,
  void,
  void
> = {
  method: HTTPMethod.POST,
  path: "electricity/",
  parser: CreateElectricityResponseSchema.parse,
};

const create = (body: CreateElectricityRequest) =>
  ApiClient.fetch<CreateElectricityResponse, CreateElectricityRequest, void>({
    endpoint: CreateElectricityEndpoint,
    body: body,
  });

export const ElectricityService = { create, list };
