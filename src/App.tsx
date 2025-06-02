import { FormEvent, MouseEvent, useRef, useState } from "react";
import styles from "./App.module.scss";
import { getTaxBrackets } from "./services/tax-brackets/tax-brackets";
import { TaxBracket } from "./services/tax-brackets/tax-brackets.types";
import { ButtonProps } from "./shared/button/Button.types";
import Card from "./shared/card/Card";
import Input from "./shared/input/Input";
import Select from "./shared/select/Select";

function App() {
    const [income, setIncome] = useState<number>(0);
    const [year, setYear] = useState<number>(2022);
    const [taxBrackets, setTaxBrackets] = useState<TaxBracket[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const years = [2019, 2020, 2021, 2022];
    const incomeInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError("");
        setTaxBrackets([]);

        const enteredIncome = incomeInputRef.current?.value || "0";
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

    const handleReset = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIncome(0);
        setYear(2022);
        setTaxBrackets([]);
        setError("");
    };

    const actions: ButtonProps[] = [
        {
            label: "Get Results",
            variant: "filled",
            type: "submit",
            disabled: isLoading || !(+(incomeInputRef.current?.value ?? 0) > 0),
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
            <h1
                className={styles["tax-calculator__title"]}
                role="heading">
                Tax Calculator
            </h1>
            <form
                className={styles["tax-calculator__form"]}
                onSubmit={handleSubmit}>
                <Card
                    actions={actions}
                    actionsPosition="right">
                    <Input
                        defaultValue={income}
                        prefix="$"
                        aria-label="income"
                        placeholder="income"
                        ref={incomeInputRef}
                    />
                    <Select
                        value={year}
                        options={years}
                        aria-label="year"
                        onChange={(event) => setYear(+event.target.value)}
                    />
                </Card>
            </form>
            <Card>
                {error ? (
                    <>{error}</>
                ) : isLoading ? (
                    <>Loading...</>
                ) : taxBrackets.length ? (
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
                    <>No tax brackets found</>
                )}
            </Card>
        </div>
    );
}

export default App;
