import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TaxCalculationForm from "./TaxCalculationForm";
import { useTaxBracketsContext } from "../../hooks/use-tax-brackets-context";

jest.mock("../../hooks/use-tax-brackets-context");

describe("TaxCalculationForm", () => {
    const dispatch = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useTaxBracketsContext as jest.Mock).mockReturnValue({
            state: {
                income: 1000,
                year: 2022,
            },
            dispatch,
        });
    });

    it("renders income input and year select", () => {
        render(<TaxCalculationForm />);
        expect(screen.getByRole("textbox", { name: /income/i })).toBeInTheDocument();
        expect(screen.getByRole("combobox", { name: /year/i })).toBeInTheDocument();
    });

    it("disables Submit button when income is invalid (NaN)", () => {
        (useTaxBracketsContext as jest.Mock).mockReturnValueOnce({
            state: { income: NaN, year: 2022 },
            dispatch,
        });
        render(<TaxCalculationForm />);
        const submitButton = screen.getByRole("button", { name: /submit/i });
        expect(submitButton).toBeDisabled();
    });

    it("dispatches SET_INCOME on income input change", async () => {
        render(<TaxCalculationForm />);
        const input = screen.getByRole("textbox", { name: /income/i });
        await userEvent.clear(input);
        await userEvent.type(input, "5000");

        // Check that at least one call matches the final payload
        expect(dispatch.mock.calls).toEqual(
            expect.arrayContaining([
                [expect.objectContaining({ type: "SET_INCOME", payload: 10000 })],
            ]),
        );

        // Optionally, check total dispatch call count
        expect(dispatch).toHaveBeenCalledTimes(5);
    });

    it("dispatches SET_YEAR on year select change", async () => {
        render(<TaxCalculationForm />);
        const select = screen.getByRole("combobox", { name: /year/i });
        await userEvent.selectOptions(select, "2021");
        expect(dispatch).toHaveBeenCalledWith({ type: "SET_YEAR", payload: 2021 });
    });

    it("dispatches SUBMIT on Submit button click", async () => {
        render(<TaxCalculationForm />);
        const submitBtn = screen.getByRole("button", { name: /submit/i });
        await userEvent.click(submitBtn);
        expect(dispatch).toHaveBeenCalledWith({ type: "SUBMIT" });
    });

    it("dispatches RESET on Reset button click", async () => {
        render(<TaxCalculationForm />);
        const resetBtn = screen.getByRole("button", { name: /reset/i });
        await userEvent.click(resetBtn);
        expect(dispatch).toHaveBeenCalledWith({ type: "RESET" });
    });

    it("prevents typing '-' and 'e' in income input", () => {
        render(<TaxCalculationForm />);
        const input = screen.getByRole("textbox", { name: /income/i });

        const preventDefault = jest.fn();

        // Simulate pressing '-' key
        const keyDownEventMinus = new KeyboardEvent("keydown", {
            key: "-",
            bubbles: true,
            cancelable: true,
        });
        Object.defineProperty(keyDownEventMinus, "preventDefault", { value: preventDefault });

        input.dispatchEvent(keyDownEventMinus);
        expect(preventDefault).toHaveBeenCalled();

        preventDefault.mockClear();

        const keyDownEventE = new KeyboardEvent("keydown", {
            key: "e",
            bubbles: true,
            cancelable: true,
        });
        Object.defineProperty(keyDownEventE, "preventDefault", { value: preventDefault });

        input.dispatchEvent(keyDownEventE);
        expect(preventDefault).toHaveBeenCalled();
    });
});
