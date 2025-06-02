import { render, screen } from "@testing-library/react";
import Input from "./Input";

describe("Input", () => {
    it("renders with a prefix and value", () => {
        render(
            <Input
                prefix="$"
                value="1234"
                onChange={() => {}}
                aria-label="input"
            />,
        );
        expect(screen.getByLabelText("input")).toHaveValue("1234");
        expect(screen.getByText("$")).toBeInTheDocument();
    });

    it("renders without a prefix", () => {
        render(
            <Input
                value="42"
                onChange={() => {}}
                aria-label="input"
            />,
        );
        expect(screen.queryByText("$")).not.toBeInTheDocument();
        expect(screen.getByLabelText("input")).toHaveValue("42");
    });

    it("spreads props (e.g., placeholder)", () => {
        render(
            <Input
                placeholder="Enter amount"
                aria-label="input"
            />,
        );
        expect(screen.getByPlaceholderText("Enter amount")).toBeInTheDocument();
    });
});
