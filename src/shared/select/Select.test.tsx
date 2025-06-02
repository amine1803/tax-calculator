import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Select from "./Select";

describe("Select", () => {
    const options = ["2023", "2022", "2021"];

    it("renders all options", () => {
        render(
            <Select
                options={options}
                aria-label="year"
            />,
        );
        const select = screen.getByLabelText("year");
        options.forEach((option) => {
            expect(screen.getByRole("option", { name: option })).toBeInTheDocument();
        });
        expect(select).toHaveValue("2023"); // default to first option
    });

    it("uses provided value", () => {
        render(
            <Select
                options={options}
                value="2022"
                onChange={() => {}}
                aria-label="year"
            />,
        );
        const select = screen.getByLabelText("year");
        expect(select).toHaveValue("2022");
    });

    it("calls onChange when value changes", async () => {
        const onChange = jest.fn();
        render(
            <Select
                options={options}
                value="2021"
                onChange={onChange}
                aria-label="year"
            />,
        );
        const select = screen.getByLabelText("year");
        await userEvent.selectOptions(select, "2022");
        expect(onChange).toHaveBeenCalled();
    });

    it("spreads additional props", () => {
        render(
            <Select
                options={options}
                data-testid="select-test"
            />,
        );
        expect(screen.getByTestId("select-test")).toBeInTheDocument();
    });
});
