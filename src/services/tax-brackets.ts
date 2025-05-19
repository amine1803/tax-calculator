import type { ActionDispatch } from "react";
import type { TaxBracketResponse } from "../components/tax-calculation-form/TaxCalculationForm.types";
import type { TaxCalculationAction } from "../store/tax-calculation.store.ts";

export async function getTaxBrackets(
    dispatch: ActionDispatch<[action: TaxCalculationAction]>,
    year: number,
): Promise<void> {
    try {
        const response = await fetch(`http://localhost:5001/tax-calculator/tax-year/${year}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) throw new Error(`HTTP error ${response.status}: ${response.statusText}`);

        const data: TaxBracketResponse = await response.json();

        dispatch({
            type: "SET_TAX_BRACKETS",
            payload: data.tax_brackets || [],
        });
        dispatch({
            type: "SET_PREVIOUS_YEAR",
            payload: year,
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        dispatch({ type: "SET_ERROR", payload: message });
    }
}
