import type { Dispatch } from "react";
import type {
    TaxCalculationAction,
    TaxCalculationState,
} from "../../store/tax-calculation.store.ts";

export interface TaxCalculationContextType {
    state: TaxCalculationState;
    dispatch: Dispatch<TaxCalculationAction>;
}
