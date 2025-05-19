import type { ActionDispatch } from "react";
import type { TaxBracketResponse } from "../../components/tax-calculation-form/TaxCalculationForm.types.ts";
import type { TaxCalculationAction } from "../../store/tax-calculation/tax-calculation.ts";

// Function that asynchronously fetches the tax brackets from the API
export async function getTaxBrackets(
    dispatch: ActionDispatch<[action: TaxCalculationAction]>,
    year: number,
): Promise<void> {
    try {
        // GET tax-calculator/tax-year/{year}
        const response = await fetch(`http://localhost:5001/tax-calculator/tax-year/${year}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        // Throws an error when the response is not a success
        if (!response.ok) throw new Error(`HTTP error ${response.status}: ${response.statusText}`);

        // Assigns and dispatches the tax brackets to the state
        const data: TaxBracketResponse = await response.json();
        dispatch({
            type: "SET_TAX_BRACKETS",
            payload: data.tax_brackets || [],
        });
    } catch (error) {
        // Error management
        const message = error instanceof Error ? error.message : String(error);
        dispatch({ type: "SET_ERROR", payload: message });
    }
}
