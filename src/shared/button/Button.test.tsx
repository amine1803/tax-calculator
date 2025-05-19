import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

describe("Button", () => {
    it("renders with default props", () => {
        render(<Button label="Click Me" />);
        const button = screen.getByRole("button", { name: /click me/i });
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute("type", "button");
        expect(button).toHaveClass("button", "button--filled");
    });

    it("applies correct variant class", () => {
        render(
            <Button
                label="Outlined"
                variant="outlined"
            />,
        );
        const button = screen.getByRole("button", { name: /outlined/i });
        expect(button).toHaveClass("button--outlined");
    });

    it("uses provided type", () => {
        render(
            <Button
                label="Submit"
                type="submit"
            />,
        );
        const button = screen.getByRole("button", { name: /submit/i });
        expect(button).toHaveAttribute("type", "submit");
    });

    it("applies disabled props when disabled is true", () => {
        render(
            <Button
                label="Disabled"
                disabled
            />,
        );
        const button = screen.getByRole("button", { name: /disabled/i });
        expect(button).toBeDisabled();
        expect(button).toHaveAttribute("aria-disabled", "true");
        expect(button).toHaveAttribute("data-disabled", "true");
    });

    it("spreads additional props", () => {
        render(
            <Button
                label="Test ID"
                data-testid="custom-button"
            />,
        );
        const button = screen.getByTestId("custom-button");
        expect(button).toBeInTheDocument();
    });

    it("handles click events", async () => {
        const onClick = jest.fn();
        render(
            <Button
                label="Click me"
                onClick={onClick}
            />,
        );
        const button = screen.getByRole("button", { name: /click me/i });
        await userEvent.click(button);
        expect(onClick).toHaveBeenCalled();
    });
});
