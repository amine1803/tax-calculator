import { render, screen } from "@testing-library/react";
import ListTable from "./ListTable";

describe("Table", () => {
    const header = ["Bracket", "Tax Owed"];
    const rows = [
        { Bracket: "$0 - $10,000", "Tax Owed": 1000 },
        { Bracket: "$10,001 - $20,000", "Tax Owed": 2000 },
    ];
    const footer = [{ Total: 3000 }];

    it("renders header", () => {
        render(
            <ListTable
                header={header}
                rows={rows}
            />,
        );
        header.forEach((header) => {
            expect(screen.getByRole("columnheader", { name: header })).toBeInTheDocument();
        });
    });

    it("renders rows and cells", () => {
        render(
            <ListTable
                header={header}
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
                header={header}
                rows={rows}
                footer={footer}
            />,
        );
        expect(screen.getByRole("heading", { name: "Total" })).toBeInTheDocument();
        expect(screen.getByText("3000")).toBeInTheDocument();
    });

    it("throws error if row column count mismatches header", () => {
        const invalidRows = [{ Bracket: "$0 - $10,000" }]; // Missing one column
        const renderInvalidTable = () =>
            render(
                <ListTable
                    header={header}
                    rows={invalidRows}
                />,
            );
        expect(renderInvalidTable).toThrow(
            "One or more rows do not match the header column count in the table.",
        );
    });

    it("throws error if footer exists but header length is less than 2", () => {
        const invalidHeader = ["Only One Header"];
        const rows = [{ "Only One Header": 123 }];
        const footer = [{ Total: 123 }];

        const renderInvalidTable = () =>
            render(
                <ListTable
                    header={invalidHeader}
                    rows={rows}
                    footer={footer}
                />,
            );

        expect(renderInvalidTable).toThrow(
            "To use a footer, original table must have at least 2 columns.",
        );
    });

    it("formats cell as currency when header is listed in currencyHeaderAndFooter", () => {
        const header = ["Label", "Amount"];
        const rows = [{ Label: "Tax", Amount: 1234.56 }];
        const currencyHeaderAndFooter = ["Amount"];

        render(
            <ListTable
                header={header}
                rows={rows}
                currencyHeaderAndFooter={currencyHeaderAndFooter}
            />,
        );

        expect(screen.getByText("$1,234.56")).toBeInTheDocument();
    });

    it("renders non-currency value as string without currency formatting", () => {
        const header = ["Label", "Amount"];
        const rows = [{ Label: "Income", Amount: 1000 }];

        render(
            <ListTable
                header={header}
                rows={rows}
            />,
        );

        expect(screen.getByText("1000")).toBeInTheDocument();
    });
});
