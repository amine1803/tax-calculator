import ErrorIcon from "@icons/error-circle.svg?react";
import { useEffect, useMemo, useState } from "react";
import styles from "./TaxCalculationTable.module.scss";
import type { TaxCalculationTableType } from "./TaxCalculationTable.types";
import { useTaxBracketsContext } from "../../hooks/use-tax-brackets-context";
import Card from "../../shared/card/Card";
import ListTable from "../../shared/list-table/ListTable";
import {
    selectError,
    selectIncome,
    selectIsLoading,
    selectIsSubmitted,
    selectPageState,
    selectTaxBrackets,
    selectYear,
} from "../../store/tax-calculation/tax-calculation";
import { formatNumber, isNumber } from "../../utils/number";

function TaxCalculationTable() {
    // State
    const { state } = useTaxBracketsContext();
    const [dots, setDots] = useState("");
    const income = selectIncome(state);
    const year = selectYear(state);
    const taxBrackets = selectTaxBrackets(state);
    const pageState = selectPageState(state);
    const error = selectError(state);
    const isSubmitted = selectIsSubmitted(state);
    const isLoading = selectIsLoading(state);

    // Header cells
    const header = ["Tax bracket(s)", "Income tax amount"];

    // Rows cells content (brackets and amount)
    const rows = useMemo(() => {
        if (!taxBrackets[year]) return [];

        return taxBrackets[year].reduce((acc, taxBracket) => {
            if (!isNumber(income) || taxBracket.min > income) return acc;

            const bracket =
                taxBracket.max !== undefined
                    ? `$${formatNumber(taxBracket.min, 2)} - $${formatNumber(taxBracket.max, 0)} (${(taxBracket.rate * 100).toFixed(1)}%)`
                    : `> $${formatNumber(taxBracket.min, 2)} (${(taxBracket.rate * 100).toFixed(1)}%)`;

            const upperBound =
                taxBracket.max !== undefined ? Math.min(income, taxBracket.max) : income;
            const amount = taxBracket.rate * (upperBound - taxBracket.min);

            return [...acc, { bracket, amount }];
        }, [] as TaxCalculationTableType[]);
    }, [isSubmitted]);

    // Footer that contains the total tax amount to pay and the salary after taxes
    const footer = useMemo(() => {
        if (!isNumber(income) || rows.length === 0) return [];

        const totalTax = rows.reduce((acc, row) => {
            const amount = +row.amount;
            return acc + amount;
        }, 0);

        const salaryAfterTax = income - totalTax;
        const effectiveRate = (totalTax / income) * 100;

        return [
            { "Effective rate": `${formatNumber(effectiveRate, 3, 2)}%` },
            { "Total income tax amount": totalTax },
            { "Salary after income tax": salaryAfterTax },
        ] as Record<string, number>[];
    }, [rows]);

    // Effect for visual loading state that adds dots to loading and loops back after 3 dots
    useEffect(() => {
        if (!isLoading) return;

        const interval = setInterval(() => {
            setDots((prevState) => (prevState.length >= 3 ? "" : prevState + "."));
        }, 500);

        return () => clearInterval(interval);
    }, [isLoading]);

    return (
        <Card
            className={styles["tax-calculation-table"]}
            data-testid="tax-calculation-table">
            {(() => {
                switch (pageState) {
                    case "init":
                        return (
                            <span className={styles["tax-calculation-table__init"]}>
                                Submit income to calculate tax brackets
                            </span>
                        );
                    case "loading":
                        return (
                            <span className={styles["tax-calculation-table__loading"]}>
                                Loading{dots}
                            </span>
                        );
                    case "loaded":
                        return rows.length > 0 ? (
                            <ListTable
                                header={header}
                                rows={rows}
                                footer={footer}
                                cellAlignment="right"
                                currencyHeaderAndFooter={[
                                    "Income tax amount",
                                    "Total income tax amount",
                                    "Salary after income tax",
                                ]}
                            />
                        ) : (
                            <span className={styles["tax-calculation-table__empty"]}>
                                No tax brackets found
                            </span>
                        );
                    case "error":
                        return (
                            <div className={styles["tax-calculation-table__error"]}>
                                <ErrorIcon
                                    className={styles["tax-calculation-table__error-icon"]}
                                />
                                <span>ERROR while loading</span>
                                <span>{error}</span>
                            </div>
                        );
                }
            })()}
        </Card>
    );
}

export default TaxCalculationTable;
