import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

    it("applies custom className", () => {
        render(
            <Input
                className="custom-class"
                value="test"
                onChange={() => {}}
                aria-label="input"
            />,
        );
        const wrapper = screen.getByLabelText("input").parentElement;
        expect(wrapper).toHaveClass("custom-class");
    });

    it("calls onKeyDown when provided", async () => {
        const handler = jest.fn();
        render(
            <Input
                value="123"
                onChange={() => {}}
                onKeyDown={handler}
                aria-label="input"
            />,
        );
        await userEvent.type(screen.getByLabelText("input"), "4");
        expect(handler).toHaveBeenCalled();
    });

    it("prevents disallowed keys for type='number'", async () => {
        const handler = jest.fn();
        render(
            <Input
                type="number"
                onKeyDown={handler}
                aria-label="input"
            />,
        );
        const input = screen.getByLabelText("input");

        const keys = ["-", "+", "e", "E"];
        for (const key of keys) {
            const event = new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true });
            const preventDefault = jest.fn();
            Object.defineProperty(event, "preventDefault", { value: preventDefault });
            input.dispatchEvent(event);
            expect(preventDefault).toHaveBeenCalled();
        }
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
