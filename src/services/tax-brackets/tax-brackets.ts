// Function that asynchronously fetches the tax brackets from the API
import { TaxBracket, TaxBracketResponse } from "./tax-brackets.types";

/**
 * Asynchronously fetches tax brackets for a given year from the API.
 *
 * @param {number} year - The tax year for which to fetch tax brackets.
 * @returns {Promise<TaxBracket[] | string>} - Resolves to an array of TaxBracket objects on success,
 * or an error message string on failure.
 */
export async function getTaxBrackets(year: number): Promise<TaxBracket[] | string> {
    try {
        // Send a GET request to the tax-calculator API for the specified year
        const response = await fetch(`http://localhost:5001/tax-calculator/tax-year/${year}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        // Check if the response is successful (HTTP status 2xx)
        if (!response.ok) throw new Error(`HTTP error ${response.status}: ${response.statusText}`);

        // Parse the JSON response into a TaxBracketResponse object
        const data: TaxBracketResponse = await response.json();

        // Return the tax brackets extracted from the response data
        return data.tax_brackets;
    } catch (error) {
        // Handle any errors that occur during the fetch or parsing
        // If error is an instance of Error, return its message; otherwise, convert it to a string
        return error instanceof Error ? error.message : String(error);
    }
}
