import { use } from "react";
import { TaxBracketsContext } from "../contexts/tax-brackets/TaxBrackets.context";
import type { TaxCalculationContextType } from "../contexts/tax-brackets/TaxBrackets.types";

export function useTaxBracketsContext(): TaxCalculationContextType {
    const context = use(TaxBracketsContext);
    if (!context)
        throw new Error(
            "The hook useTaxBracketsContext must be used within a TaxCalculationFormProvider",
        );
    return context;
}
