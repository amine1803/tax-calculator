import styles from "./TaxCalculationForm.module.scss";
import { useTaxBracketsContext } from "../../hooks/use-tax-brackets-context";
import type { ButtonProps } from "../../shared/button/Button.types";
import Card from "../../shared/card/Card";
import Input from "../../shared/input/Input";
import Select from "../../shared/select/Select";
import { selectIncome, selectYear } from "../../store/tax-calculation.store";
import { isNumber } from "../../utils/assertions";

function TaxCalculationForm() {
    const { state, dispatch } = useTaxBracketsContext();

    const income = selectIncome(state);
    const year = selectYear(state);

    const years = [2022, 2021, 2020, 2019];

    const actions: ButtonProps[] = [
        {
            label: "Submit",
            type: "submit",
            disabled: !isNumber(income),
            onClick: () => dispatch({ type: "SUBMIT" }),
        },
        {
            label: "Reset",
            variant: "outlined",
            onClick: () => dispatch({ type: "RESET" }),
        },
    ];

    return (
        <Card
            className={styles["tax-calculation-form"]}
            actions={actions}
            actionsPosition="center"
            data-testid="tax-calculation-form">
            <Input
                value={isNumber(income) ? income : ""}
                placeholder="Enter your income"
                prefix="$"
                type="number"
                min="0"
                onChange={(event) => dispatch({ type: "SET_INCOME", payload: +event.target.value })}
            />
            <Select
                value={year}
                options={years}
                onChange={(event) => dispatch({ type: "SET_YEAR", payload: +event.target.value })}
            />
        </Card>
    );
}

export default TaxCalculationForm;
