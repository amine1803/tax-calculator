import { render } from "@testing-library/react";
import TaxCalculationEffect from "./TaxCalculationEffect";
import { useTaxBracketsContext } from "../../hooks/use-tax-brackets-context";
import { getTaxBrackets } from "../../services/tax-brackets/tax-brackets";

jest.mock("../../hooks/use-tax-brackets-context");
jest.mock("../../services/tax-brackets/tax-brackets");

describe("TaxCalculationEffect", () => {
    const dispatch = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("Calls getTaxBrackets if submitted and no brackets for year", () => {
        (useTaxBracketsContext as jest.Mock).mockReturnValue({
            state: {
                year: 2022,
                taxBrackets: {},
                isSubmitted: true,
                isError: false,
            },
            dispatch,
        });

        render(<TaxCalculationEffect />);
        expect(getTaxBrackets).toHaveBeenCalledWith(dispatch, 2022);
    });

    it("Dispatches SET_TAX_BRACKETS if submitted and brackets exist and no error", () => {
        (useTaxBracketsContext as jest.Mock).mockReturnValue({
            state: {
                year: 2022,
                taxBrackets: { 2022: [{ bracket: [0, 10000], amount: 100 }] },
                isSubmitted: true,
                isError: false,
            },
            dispatch,
        });

        render(<TaxCalculationEffect />);
        expect(dispatch).toHaveBeenCalledWith({ type: "SET_TAX_BRACKETS", payload: [] });
        expect(getTaxBrackets).not.toHaveBeenCalled();
    });

    it("Does nothing if not submitted", () => {
        (useTaxBracketsContext as jest.Mock).mockReturnValue({
            state: {
                year: 2022,
                taxBrackets: {},
                isSubmitted: false,
                isError: false,
            },
            dispatch,
        });

        render(<TaxCalculationEffect />);
        expect(getTaxBrackets).not.toHaveBeenCalled();
        expect(dispatch).not.toHaveBeenCalled();
    });
});
