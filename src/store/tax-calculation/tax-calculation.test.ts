import {
    initialTaxCalculationState,
    taxCalculationReducer,
    selectIncome,
    selectYear,
    selectTaxBrackets,
    selectPageState,
    selectError,
    selectIsSubmitted,
    selectIsLoading,
    selectIsError,
    TaxCalculationPageState,
} from "./tax-calculation";
import type { TaxCalculationAction } from "./tax-calculation";
import type { TaxBracket } from "../../components/tax-calculation-form/TaxCalculationForm.types";

describe("taxCalculationReducer", () => {
    it("handles SET_INCOME", () => {
        const action: TaxCalculationAction = { type: "SET_INCOME", payload: 50000 };
        const result = taxCalculationReducer(initialTaxCalculationState, action);
        expect(result.income).toBe(50000);
    });

    it("handles SET_YEAR", () => {
        const action: TaxCalculationAction = { type: "SET_YEAR", payload: 2023 };
        const result = taxCalculationReducer(initialTaxCalculationState, action);
        expect(result.year).toBe(2023);
    });

    it("handles SET_TAX_BRACKETS", () => {
        const brackets: TaxBracket[] = [{ min: 0, max: 10000, rate: 0.1 }];
        const action: TaxCalculationAction = { type: "SET_TAX_BRACKETS", payload: brackets };
        const result = taxCalculationReducer({ ...initialTaxCalculationState, year: 2021 }, action);
        expect(result.taxBrackets[2021]).toEqual(brackets);
        expect(result.pageState).toBe("loaded");
    });

    it("handles SET_PAGE_STATE", () => {
        const action: TaxCalculationAction = { type: "SET_PAGE_STATE", payload: "error" };
        const result = taxCalculationReducer(initialTaxCalculationState, action);
        expect(result.pageState).toBe("error");
    });

    it("handles SET_ERROR", () => {
        const action: TaxCalculationAction = { type: "SET_ERROR", payload: "Oops" };
        const result = taxCalculationReducer(initialTaxCalculationState, action);
        expect(result.error).toBe("Oops");
        expect(result.pageState).toBe("error");
    });

    it("handles SUBMIT", () => {
        const action: TaxCalculationAction = { type: "SUBMIT" };
        const result = taxCalculationReducer(initialTaxCalculationState, action);
        expect(result.pageState).toBe("loading");
        expect(result.isSubmitted).toBe(true);
    });

    it("handles RESET", () => {
        const prevState = { ...initialTaxCalculationState, income: 10000, year: 2020 };
        const action: TaxCalculationAction = { type: "RESET" };
        const result = taxCalculationReducer(prevState, action);
        expect(result).toEqual(initialTaxCalculationState);
    });
});

describe("selectors", () => {
    const state = {
        income: 60000,
        year: 2022,
        taxBrackets: { 2022: [] },
        pageState: "loading" as TaxCalculationPageState,
        error: "error",
        isSubmitted: true,
    };

    it("selectIncome returns income", () => {
        expect(selectIncome(state)).toBe(60000);
    });

    it("selectYear returns year", () => {
        expect(selectYear(state)).toBe(2022);
    });

    it("selectTaxBrackets returns brackets", () => {
        expect(selectTaxBrackets(state)).toEqual({ 2022: [] });
    });

    it("selectPageState returns page state", () => {
        expect(selectPageState(state)).toBe("loading");
    });

    it("selectError returns error", () => {
        expect(selectError(state)).toBe("error");
    });

    it("selectIsSubmitted returns true", () => {
        expect(selectIsSubmitted(state)).toBe(true);
    });

    it("selectIsLoading returns true if pageState is loading", () => {
        expect(selectIsLoading(state)).toBe(true);
    });

    it("selectIsError returns false if pageState is not error", () => {
        expect(selectIsError(state)).toBe(false);
    });
});
