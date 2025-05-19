import { type PropsWithChildren, useMemo, useReducer } from "react";
import { TaxBracketsContext } from "./TaxBrackets.context";
import type { TaxCalculationContextType } from "./TaxBrackets.types";
import {
    initialTaxCalculationState,
    taxCalculationReducer,
} from "../../store/tax-calculation/tax-calculation";

function TaxBracketsProvider({ children }: PropsWithChildren) {
    // State
    const [state, dispatch] = useReducer(taxCalculationReducer, initialTaxCalculationState);

    // Guarantees the state management updates when state or dispatch function is changed
    const contextValue = useMemo<TaxCalculationContextType>(
        () => ({ state, dispatch }),
        [state, dispatch],
    );

    return <TaxBracketsContext value={contextValue}>{children}</TaxBracketsContext>;
}

export default TaxBracketsProvider;
