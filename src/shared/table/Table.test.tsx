import { render, screen } from "@testing-library/react";
import Table from "./Table";

describe("Table", () => {
    const headers = ["Bracket", "Tax Owed"];
    const rows = [
        { Bracket: "$0 - $10,000", "Tax Owed": 1000 },
        { Bracket: "$10,001 - $20,000", "Tax Owed": 2000 },
    ];
    const footer = [{ Total: 3000 }];

    it("renders headers", () => {
        render(
            <Table
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
            <Table
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
            <Table
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
            <Table
                headers={headers}
                rows={rows}
                footer={footer}
                isCurrency
            />,
        );
        expect(screen.getByText("$1000.00")).toBeInTheDocument();
        expect(screen.getByText("$2000.00")).toBeInTheDocument();
        expect(screen.getByText("$3000.00")).toBeInTheDocument();
    });

    it("throws error if row column count mismatches header", () => {
        const invalidRows = [{ Bracket: "$0 - $10,000" }]; // Missing one column
        const renderInvalidTable = () =>
            render(
                <Table
                    headers={headers}
                    rows={invalidRows}
                />,
            );
        expect(renderInvalidTable).toThrow(
            "One or more rows do not match the header column count in the table.",
        );
    });
});
