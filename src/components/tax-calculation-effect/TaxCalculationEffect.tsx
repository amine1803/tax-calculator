import { useEffect } from "react";
import { useTaxBracketsContext } from "../../hooks/use-tax-brackets-context";
import { getTaxBrackets } from "../../services/tax-brackets/tax-brackets";
import {
    selectIsError,
    selectIsSubmitted,
    selectTaxBrackets,
    selectYear,
} from "../../store/tax-calculation/tax-calculation";

function TaxCalculationEffect() {
    const { state, dispatch } = useTaxBracketsContext();

    const year = selectYear(state);
    const taxBrackets = selectTaxBrackets(state);
    const isSubmitted = selectIsSubmitted(state);
    const isError = selectIsError(state);

    useEffect(() => {
        if (isSubmitted) {
            if (!taxBrackets[year]) {
                getTaxBrackets(dispatch, year);
            } else if (!isError) {
                dispatch({ type: "SET_TAX_BRACKETS", payload: [] });
            }
        }
    }, [isSubmitted]);

    return <></>;
}

export default TaxCalculationEffect;
