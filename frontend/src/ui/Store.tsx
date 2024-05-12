import React, { ReactNode, useCallback, useState } from "react";
import { Electricity } from "../services/electricity";

type State = { electrecityData?: Electricity[]; loading?: boolean };

const initialState: State = { electrecityData: undefined, loading: false };

export const Store = React.createContext<State>(initialState);

export const StoreState: { set: (state: Partial<State>) => void } = {
  set: () => undefined,
};

export type StoreProviderProps = { children: ReactNode };

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const [state, setState] = useState<State>(initialState);

  StoreState.set = useCallback((updates: Partial<State>) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  return <Store.Provider value={state}>{children}</Store.Provider>;
};
