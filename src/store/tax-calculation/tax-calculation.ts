import type { TaxBracket } from "../../components/tax-calculation-form/TaxCalculationForm.types.ts";

export type TaxCalculationAction =
    | {
          type: "SET_INCOME";
          payload: number | "";
      }
    | {
          type: "SET_YEAR";
          payload: number;
      }
    | {
          type: "SET_TAX_BRACKETS";
          payload: TaxBracket[];
      }
    | {
          type: "SET_PAGE_STATE";
          payload: TaxCalculationPageState;
      }
    | {
          type: "SET_ERROR";
          payload?: string;
      }
    | {
          type: "SUBMIT";
      }
    | {
          type: "RESET";
      };

export type TaxCalculationPageState = "init" | "loading" | "loaded" | "error";

export interface TaxCalculationState {
    income?: number | "";
    year: number;
    taxBrackets: Record<number, TaxBracket[]>;
    pageState: TaxCalculationPageState;
    error?: string;
    isSubmitted: boolean;
}

export const initialTaxCalculationState: TaxCalculationState = {
    year: 2022,
    taxBrackets: [],
    pageState: "init",
    isSubmitted: false,
};

export function taxCalculationReducer(
    state: TaxCalculationState,
    action: TaxCalculationAction,
): TaxCalculationState {
    switch (action.type) {
        case "SET_INCOME":
            return { ...state, income: action.payload };
        case "SET_YEAR":
            return { ...state, year: action.payload };
        case "SET_TAX_BRACKETS":
            return {
                ...state,
                pageState: "loaded",
                taxBrackets: {
                    ...state.taxBrackets,
                    ...(action.payload.length > 0 && { [state.year]: action.payload }),
                },
                isSubmitted: false,
            };
        case "SET_PAGE_STATE":
            return { ...state, pageState: action.payload };
        case "SET_ERROR":
            return { ...state, pageState: "error", error: action.payload, isSubmitted: false };
        case "SUBMIT":
            return { ...state, pageState: "loading", isSubmitted: true };
        case "RESET":
            return { ...initialTaxCalculationState };
        default:
            return state;
    }
}

// SELECTORS
export const selectIncome = (state: TaxCalculationState) => state.income;
export const selectYear = (state: TaxCalculationState) => state.year;
export const selectTaxBrackets = (state: TaxCalculationState) => state.taxBrackets;
export const selectPageState = (state: TaxCalculationState) => state.pageState;
export const selectError = (state: TaxCalculationState) => state.error;
export const selectIsSubmitted = (state: TaxCalculationState) => state.isSubmitted;

export const selectIsLoading = (state: TaxCalculationState) => selectPageState(state) === "loading";
export const selectIsError = (state: TaxCalculationState) => selectPageState(state) === "error";
