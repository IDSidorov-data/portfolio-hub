import { createContext, useContext } from "react";
import type { ReactNode } from "react";

export const CleanModeContext = createContext(false);

export function CleanModeProvider({
  value,
  children,
}: {
  value: boolean;
  children: ReactNode;
}) {
  return <CleanModeContext.Provider value={value}>{children}</CleanModeContext.Provider>;
}

export function useCleanMode(): boolean {
  return useContext(CleanModeContext);
}
