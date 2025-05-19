import { render, screen } from "@testing-library/react";
import TaxCalculationTable from "./TaxCalculationTable";
import { useTaxBracketsContext } from "../../hooks/use-tax-brackets-context";

jest.mock("../../hooks/use-tax-brackets-context");

describe("TaxCalculationTable", () => {
    const mockState = {
        income: 60000,
        year: 2022,
        taxBrackets: {
            2022: [
                { min: 0, max: 20000, rate: 0.1 },
                { min: 20000, max: 50000, rate: 0.2 },
                { min: 50000, rate: 0.3 },
            ],
        },
        isSubmitted: true,
        pageState: "loaded",
        isLoading: false,
        error: null,
    };

    it("renders initial state message", () => {
        (useTaxBracketsContext as jest.Mock).mockReturnValue({
            state: { ...mockState, pageState: "init" },
        });
        render(<TaxCalculationTable />);
        expect(screen.getByText(/submit income to calculate tax brackets/i)).toBeInTheDocument();
    });

    it("renders loading message", () => {
        (useTaxBracketsContext as jest.Mock).mockReturnValue({
            state: { ...mockState, pageState: "loading", isLoading: true },
        });
        render(<TaxCalculationTable />);
        expect(screen.getByText(/^loading/i)).toBeInTheDocument();
    });

    it("renders the tax table with data and footer", () => {
        (useTaxBracketsContext as jest.Mock).mockReturnValue({
            state: mockState,
        });
        render(<TaxCalculationTable />);
        expect(screen.getByRole("table")).toBeInTheDocument();
        expect(screen.getByText("$0 - $20,000 (10.0%)")).toBeInTheDocument();
        expect(screen.getByText("$20,000 - $50,000 (20.0%)")).toBeInTheDocument();
        expect(screen.getByText("> $50,000 (30.0%)")).toBeInTheDocument();
        expect(screen.getByText(/total income tax amount/i)).toBeInTheDocument();
        expect(screen.getByText(/salary after income tax/i)).toBeInTheDocument();
    });

    it("renders 'No tax brackets found' if no rows are applicable", () => {
        (useTaxBracketsContext as jest.Mock).mockReturnValue({
            state: {
                ...mockState,
                income: 1000,
                taxBrackets: {},
            },
        });
        render(<TaxCalculationTable />);
        expect(screen.getByText(/no tax brackets found/i)).toBeInTheDocument();
    });

    it("renders correct tax amounts and salary after tax", () => {
        (useTaxBracketsContext as jest.Mock).mockReturnValue({ state: mockState });
        render(<TaxCalculationTable />);
        expect(
            screen.getByText((_, element) => element?.textContent === "$11,000.00"),
        ).toBeInTheDocument();
        expect(
            screen.getByText((_, element) => element?.textContent === "$49,000.00"),
        ).toBeInTheDocument();
    });

    it("renders empty when income is not a number", () => {
        (useTaxBracketsContext as jest.Mock).mockReturnValue({
            state: {
                ...mockState,
                income: undefined,
            },
        });
        render(<TaxCalculationTable />);
        expect(screen.getByText(/no tax brackets found/i)).toBeInTheDocument();
    });

    it("renders error message when pageState is error", () => {
        (useTaxBracketsContext as jest.Mock).mockReturnValue({
            state: {
                ...mockState,
                pageState: "error",
                error: "Something went wrong",
            },
        });
        render(<TaxCalculationTable />);
        expect(screen.getByText(/error while loading/i)).toBeInTheDocument();
        expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
});
