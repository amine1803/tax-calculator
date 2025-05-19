import { createContext } from "react";
import type { TaxCalculationContextType } from "./TaxBrackets.types";

// Context that contains the state management state and context
export const TaxBracketsContext = createContext<TaxCalculationContextType | undefined>(undefined);
