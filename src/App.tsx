import { FormEvent, MouseEvent, useRef, useState } from "react";
import styles from "./App.module.scss";
import { getTaxBrackets } from "./services/tax-brackets/tax-brackets";
import { TaxBracket } from "./services/tax-brackets/tax-brackets.types";
import { ButtonProps } from "./shared/button/Button.types";
import Card from "./shared/card/Card";
import Input from "./shared/input/Input";
import Select from "./shared/select/Select";

/**
 * The main Tax Calculator App component.
 * Allows users to input income and year, retrieves and displays tax brackets.
 */
function App() {
    // State to store the user's income input
    const [income, setIncome] = useState<number>(0);
    // State to store the selected year for tax brackets
    const [year, setYear] = useState<number>(2022);
    // State to store the fetched tax brackets
    const [taxBrackets, setTaxBrackets] = useState<TaxBracket[]>([]);
    // State to indicate loading status during data fetch
    const [isLoading, setIsLoading] = useState<boolean>(false);
    // State to store any error messages
    const [error, setError] = useState<string>("");

    // Array of years for the year selection dropdown
    const years = [2019, 2020, 2021, 2022];
    // Reference to the income input element for direct DOM access
    const incomeInputRef = useRef<HTMLInputElement>(null);

    /**
     * Handles form submission.
     * Validates income input, sets loading state, fetches tax brackets, and handles errors.
     * @param {FormEvent<HTMLFormElement>} event - The form submit event
     */
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError("");
        setTaxBrackets([]);

        const enteredIncome = incomeInputRef.current?.value ?? "0";

        if (!/^\d+(\.\d+)?$/.test(enteredIncome) || +enteredIncome <= 0) {
            setError("Please enter a valid positive income amount.");
            setIsLoading(false);
            return;
        }

        setIncome(+enteredIncome);

        try {
            const brackets = await getTaxBrackets(year);

            if (Array.isArray(brackets)) setTaxBrackets(brackets);
            else setError(brackets);
        } catch (error) {
            setError(error as string);
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Resets the calculator form to default values.
     * @param {MouseEvent<HTMLButtonElement>} event - The reset button click event
     */
    const handleReset = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIncome(0);
        setYear(2022);
        setTaxBrackets([]);
        setError("");
        if (incomeInputRef.current) {
            incomeInputRef.current.value = "";
        }
    };

    // Array of action buttons for the form
    // "Get Results" button submits the form and is disabled while loading
    // "Reset" button clears the form inputs and results
    const actions: ButtonProps[] = [
        {
            label: "Get Results",
            variant: "filled",
            type: "submit",
            disabled: isLoading,
        },
        {
            label: "Reset",
            variant: "filled",
            type: "reset",
            onClick: (event) => handleReset(event),
        },
    ];

    return (
        <div className={styles["tax-calculator"]}>
            {/* App title */}
            <h1
                className={styles["tax-calculator__title"]}
                role="heading">
                Tax Calculator
            </h1>
            {/* Form for income and year input */}
            <form
                className={styles["tax-calculator__form"]}
                onSubmit={handleSubmit}>
                <Card
                    actions={actions}
                    actionsPosition="right">
                    {/* Income input with prefix and ref */}
                    <Input
                        defaultValue={income}
                        prefix="$"
                        aria-label="income"
                        placeholder="income"
                        ref={incomeInputRef}
                    />
                    {/* Year selection dropdown */}
                    <Select
                        value={year}
                        options={years}
                        aria-label="year"
                        onChange={(event) => setYear(+event.target.value)}
                    />
                </Card>
            </form>
            {/* Card to display results, errors, or loading state */}
            <Card>
                {error ? (
                    // Display error message if any
                    <span className={styles["tax-calculator__error"]}>{error}</span>
                ) : isLoading ? (
                    // Show loading indicator while fetching data
                    <>Loading...</>
                ) : taxBrackets.length ? (
                    // Display tax bracket results if available
                    <div className={styles["tax-calculator__results"]}>
                        <div>
                            <h3>Bracket Range</h3>
                            {taxBrackets
                                .filter((bracket) => bracket.min <= +income)
                                .map((bracket, index) => (
                                    <span key={index}>
                                        {`$${bracket.min}`}
                                        {bracket.max ? ` - $${bracket.max}` : "+"}
                                    </span>
                                ))}
                        </div>
                        <div>
                            <h3>Tax Amount</h3>
                            {taxBrackets
                                .filter((bracket) => bracket.min <= +income)
                                .map((bracket, index) => (
                                    <span key={index}>
                                        {bracket.max
                                            ? `$${((Math.min(bracket.max, +income) - bracket.min) * bracket.rate).toFixed(2)}`
                                            : `$${((+income - bracket.min) * bracket.rate).toFixed(2)}`}
                                    </span>
                                ))}
                        </div>
                    </div>
                ) : (
                    // Message when no tax brackets are found
                    <>No tax brackets found</>
                )}
            </Card>
        </div>
    );
}

export default App;
