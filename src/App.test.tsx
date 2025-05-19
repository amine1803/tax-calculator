import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
    it("renders title", () => {
        render(<App />);
        expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Tax Calculator");
    });

    it("renders components", () => {
        render(<App />);
        expect(screen.getByTestId("tax-calculation-form")).toBeInTheDocument();
        expect(screen.getByTestId("tax-calculation-table")).toBeInTheDocument();
    });
});
