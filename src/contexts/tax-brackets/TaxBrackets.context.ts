import { createContext } from "react";
import type { TaxCalculationContextType } from "./TaxBrackets.types";

export const TaxBracketsContext = createContext<TaxCalculationContextType | undefined>(undefined);
