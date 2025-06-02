// Function that asynchronously fetches the tax brackets from the API
import { TaxBracket, TaxBracketResponse } from "./tax-brackets.types";

export async function getTaxBrackets(year: number): Promise<TaxBracket[] | string> {
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
        return data.tax_brackets;
    } catch (error) {
        // Error management
        return error instanceof Error ? error.message : String(error);
    }
}
