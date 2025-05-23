import type { Dispatch } from "react";
import type {
    TaxCalculationAction,
    TaxCalculationState,
} from "../../store/tax-calculation/tax-calculation";

export interface TaxCalculationContextType {
    state: TaxCalculationState;
    dispatch: Dispatch<TaxCalculationAction>;
}
