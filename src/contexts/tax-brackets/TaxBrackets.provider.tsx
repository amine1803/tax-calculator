import { type PropsWithChildren, useMemo, useReducer } from "react";
import { TaxBracketsContext } from "./TaxBrackets.context";
import type { TaxCalculationContextType } from "./TaxBrackets.types";
import {
    initialTaxCalculationState,
    taxCalculationReducer,
} from "../../store/tax-calculation.store";

function TaxBracketsProvider({ children }: PropsWithChildren) {
    const [state, dispatch] = useReducer(taxCalculationReducer, initialTaxCalculationState);

    const contextValue = useMemo<TaxCalculationContextType>(
        () => ({ state, dispatch }),
        [state, dispatch],
    );

    return <TaxBracketsContext value={contextValue}>{children}</TaxBracketsContext>;
}

export default TaxBracketsProvider;
