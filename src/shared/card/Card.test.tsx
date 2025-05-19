import { render, screen } from "@testing-library/react";
import Card from "./Card";

describe("Card", () => {
    it("renders title and children", () => {
        render(
            <Card title="Test Title">
                <p>Card content</p>
            </Card>,
        );

        expect(screen.getByText("Test Title")).toBeInTheDocument();
        expect(screen.getByText("Card content")).toBeInTheDocument();
    });

    it("applies custom class name", () => {
        render(
            <Card
                className="custom-class"
                data-testid="custom-class-card">
                Content
            </Card>,
        );
        const card = screen.getByTestId("custom-class-card");
        expect(card).toHaveClass("custom-class");
    });

    it("renders buttons when actions are provided", () => {
        render(
            <Card
                actions={[
                    { label: "Action 1", onClick: jest.fn() },
                    { label: "Action 2", onClick: jest.fn() },
                ]}
            />,
        );

        expect(screen.getByRole("button", { name: "Action 1" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Action 2" })).toBeInTheDocument();
    });

    it("defaults actionsPosition to left", () => {
        render(<Card actions={[{ label: "Test", onClick: jest.fn() }]} />);
        const actionsWrapper = screen.getByRole("button", { name: "Test" }).parentElement;
        expect(actionsWrapper?.className).toMatch(/card__actions--left/);
    });

    it("applies custom actionsPosition", () => {
        render(
            <Card
                actions={[{ label: "Centered", onClick: jest.fn() }]}
                actionsPosition="center"
            />,
        );
        const actionsWrapper = screen.getByRole("button", { name: "Centered" }).parentElement;
        expect(actionsWrapper?.className).toMatch(/card__actions--center/);
    });

    it("spreads other props like data-testid", () => {
        render(<Card data-testid="card-wrapper">Hello</Card>);
        expect(screen.getByTestId("card-wrapper")).toBeInTheDocument();
    });
});
