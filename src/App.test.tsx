import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import * as taxService from "./services/tax-brackets/tax-brackets";

jest.mock("./services/tax-brackets/tax-brackets");

describe("App Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Existing tests here...

    test("handles API error in handleSubmit and shows error message", async () => {
        (taxService.getTaxBrackets as jest.Mock).mockRejectedValue("API error");

        render(<App />);
        const input = screen.getByPlaceholderText(/income/i);
        const submitBtn = screen.getByRole("button", { name: /get results/i });

        fireEvent.change(input, { target: { value: "10000" } });
        fireEvent.click(submitBtn);

        await waitFor(() => {
            expect(screen.getByText(/api error/i)).toBeInTheDocument();
        });
    });

    test("shows 'No tax brackets found' when API returns empty array", async () => {
        (taxService.getTaxBrackets as jest.Mock).mockResolvedValue([]);

        render(<App />);
        const input = screen.getByPlaceholderText(/income/i);
        const submitBtn = screen.getByRole("button", { name: /get results/i });

        fireEvent.change(input, { target: { value: "10000" } });
        fireEvent.click(submitBtn);

        await waitFor(() => {
            expect(screen.getByText(/no tax brackets found/i)).toBeInTheDocument();
        });
    });

    test("reset button clears income, year, errors, and results", async () => {
        const mockBrackets = [
            { min: 0, max: 10000, rate: 0.1 },
            { min: 10001, max: 20000, rate: 0.15 },
        ];

        (taxService.getTaxBrackets as jest.Mock).mockResolvedValue(mockBrackets);

        render(<App />);
        const input = screen.getByPlaceholderText(/income/i);
        const submitBtn = screen.getByRole("button", { name: /get results/i });
        const resetBtn = screen.getByRole("button", { name: /reset/i });

        fireEvent.change(input, { target: { value: "15000" } });
        fireEvent.click(submitBtn);

        await waitFor(() => {
            expect(screen.getByText(/\$0 - \$10000/)).toBeInTheDocument();
        });

        fireEvent.click(resetBtn);

        // Check input cleared or reset to default (0)
        expect(input).toHaveValue(""); // Input is uncontrolled so might be ""
        expect(screen.queryByText(/\$0 - \$10000/)).not.toBeInTheDocument();
        expect(
            screen.queryByText(/please enter a valid positive income amount/i),
        ).not.toBeInTheDocument();
    });

    test("handles income exactly on bracket boundaries", async () => {
        const mockBrackets = [
            { min: 0, max: 10000, rate: 0.1 },
            { min: 10000, max: 20000, rate: 0.15 },
        ];

        (taxService.getTaxBrackets as jest.Mock).mockResolvedValue(mockBrackets);

        render(<App />);
        const input = screen.getByPlaceholderText(/income/i);
        const submitBtn = screen.getByRole("button", { name: /get results/i });

        fireEvent.change(input, { target: { value: "10000" } });
        fireEvent.click(submitBtn);

        await waitFor(() => {
            expect(screen.getByText(/\$0 - \$10000/)).toBeInTheDocument();
            expect(screen.getByText(/\$10000 - \$20000/)).toBeInTheDocument();
            // Check that tax amount for first bracket is calculated correctly
            expect(screen.getAllByText(/\$1000.00/).length).toBeGreaterThan(0);
        });
    });

    test("sets error when API returns non-array response", async () => {
        const errorMessage = "Invalid response from API";
        (taxService.getTaxBrackets as jest.Mock).mockResolvedValue(errorMessage);

        render(<App />);
        const input = screen.getByPlaceholderText(/income/i);
        const submitBtn = screen.getByRole("button", { name: /get results/i });

        fireEvent.change(input, { target: { value: "10000" } });
        fireEvent.click(submitBtn);

        await waitFor(() => {
            expect(screen.getByText(errorMessage)).toBeInTheDocument();
        });
    });
});
