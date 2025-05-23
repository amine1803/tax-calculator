import { render, screen } from "@testing-library/react";
import ListTable from "./ListTable";

describe("Table", () => {
    const headers = ["Bracket", "Tax Owed"];
    const rows = [
        { Bracket: "$0 - $10,000", "Tax Owed": 1000 },
        { Bracket: "$10,001 - $20,000", "Tax Owed": 2000 },
    ];
    const footer = [{ Total: 3000 }];

    it("renders headers", () => {
        render(
            <ListTable
                headers={headers}
                rows={rows}
            />,
        );
        headers.forEach((header) => {
            expect(screen.getByRole("columnheader", { name: header })).toBeInTheDocument();
        });
    });

    it("renders rows and cells", () => {
        render(
            <ListTable
                headers={headers}
                rows={rows}
            />,
        );
        expect(screen.getAllByRole("row")).toHaveLength(rows.length + 1); // +1 for header
        rows.forEach((row) => {
            Object.values(row).forEach((value) => {
                expect(screen.getByText(value.toString())).toBeInTheDocument();
            });
        });
    });

    it("renders footer with correct values", () => {
        render(
            <ListTable
                headers={headers}
                rows={rows}
                footer={footer}
            />,
        );
        expect(screen.getByRole("heading", { name: "Total" })).toBeInTheDocument();
        expect(screen.getByText("3000")).toBeInTheDocument();
    });

    it("formats numeric cells as currency if isCurrency is true", () => {
        render(
            <ListTable
                headers={headers}
                rows={rows}
                footer={footer}
                isCurrency
            />,
        );
        expect(screen.getByText("$1,000.00")).toBeInTheDocument();
        expect(screen.getByText("$2,000.00")).toBeInTheDocument();
        expect(screen.getByText("$3,000.00")).toBeInTheDocument();
    });

    it("throws error if row column count mismatches header", () => {
        const invalidRows = [{ Bracket: "$0 - $10,000" }]; // Missing one column
        const renderInvalidTable = () =>
            render(
                <ListTable
                    headers={headers}
                    rows={invalidRows}
                />,
            );
        expect(renderInvalidTable).toThrow(
            "One or more rows do not match the header column count in the table.",
        );
    });

    it("throws error if footer exists but headers length is less than 2", () => {
        const invalidHeaders = ["Only One Header"];
        const rows = [{ "Only One Header": 123 }];
        const footer = [{ Total: 123 }];

        const renderInvalidTable = () =>
            render(
                <ListTable
                    headers={invalidHeaders}
                    rows={rows}
                    footer={footer}
                />,
            );

        expect(renderInvalidTable).toThrow(
            "To use a footer, original table must have at least 2 columns.",
        );
    });
});
