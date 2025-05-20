import { ChangeEvent } from "react";
import styles from "./TaxCalculationForm.module.scss";
import { useTaxBracketsContext } from "../../hooks/use-tax-brackets-context";
import type { ButtonProps } from "../../shared/button/Button.types";
import Card from "../../shared/card/Card";
import Input from "../../shared/input/Input";
import Select from "../../shared/select/Select";
import {
    selectIncome,
    selectIsLoading,
    selectYear,
} from "../../store/tax-calculation/tax-calculation";
import { isNumber } from "../../utils/number";

function TaxCalculationForm() {
    // State
    const { state, dispatch } = useTaxBracketsContext();
    const income = selectIncome(state);
    const year = selectYear(state);
    const isLoading = selectIsLoading(state);

    // Years to select
    const years = [2022, 2021, 2020, 2019];

    // Action buttons props at the bottom of the form
    const actions: ButtonProps[] = [
        {
            label: "Submit",
            type: "submit",
            disabled: isLoading || !isNumber(income),
            onClick: () => dispatch({ type: "SUBMIT" }),
        },
        {
            label: "Reset",
            variant: "outlined",
            disabled: isLoading,
            onClick: () => dispatch({ type: "RESET" }),
        },
    ];

    // Event listener that converts the income value to a number or empty string depending on the need
    const onIncomeInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const income = event.target.value;
        dispatch({ type: "SET_INCOME", payload: income === "" ? "" : +income });
    };

    // Event listener that converts the year value to a number
    const onYearSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const year = event.target.value;
        dispatch({ type: "SET_YEAR", payload: +year });
    };

    return (
        <Card
            className={styles["tax-calculation-form"]}
            actions={actions}
            actionsPosition="center"
            data-testid="tax-calculation-form">
            <Input
                value={isNumber(income) ? income : ""}
                disabled={isLoading}
                placeholder="Enter your income"
                aria-label="income"
                prefix="$"
                type="number"
                min="0"
                onChange={onIncomeInputChange}
            />
            <Select
                value={year}
                disabled={isLoading}
                aria-label="year"
                options={years}
                onChange={onYearSelectChange}
            />
        </Card>
    );
}

export default TaxCalculationForm;
