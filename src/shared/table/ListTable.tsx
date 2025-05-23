import styles from "./ListTable.module.scss";
import type { ListTableProps } from "./ListTable.types";
import { formatNumber } from "../../utils/number";

function ListTable<T extends object>({
    header,
    rows,
    footer,
    className,
    cellAlignment,
    currencyHeaderAndFooter,
}: ListTableProps<T>) {
    // Checks if there are more keys in either the header or the rows and throws an error if there's a mismatch
    if (header && rows) {
        const headerLength = header.length;
        const mismatched = rows.some((row) => Object.keys(row).length !== headerLength);

        if (mismatched)
            throw new Error("One or more rows do not match the header column count in the table.");
    }

    if (header.length < 2 && footer)
        throw new Error("To use a footer, original table must have at least 2 columns.");

    // Class name(s)
    const tableClassName = [styles.table, className].filter(Boolean).join(" ");
    const cellClassName = [styles.table__cell, styles[`table__cell--${cellAlignment ?? "left"}`]]
        .filter(Boolean)
        .join(" ");

    const cellValue = (value: string | number | boolean, title: string) => {
        if (currencyHeaderAndFooter?.includes(title)) return `$${formatNumber(+value, 2)}`;
        return String(value);
    };

    // How much do the footer titles span
    const footerColSpan = footer && header.length > 2 ? header.length - 1 : 1;

    return (
        <table className={tableClassName}>
            {header.length > 0 && (
                <thead>
                    <tr>
                        {header.map((header, index) => (
                            <th
                                key={index}
                                className={styles["table__header-cell"]}>
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
            )}
            {rows.length > 0 && (
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className={styles.table__row}>
                            {Object.values(row).map((value, cellIndex) => (
                                <td
                                    key={cellIndex}
                                    className={cellClassName}>
                                    {cellValue(value, header[cellIndex])}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            )}
            {footer && (
                <tfoot className={styles.table__footer}>
                    {footer.map((footerItem, footerIndex) => {
                        const [key, value] = Object.entries(footerItem)[0];
                        return (
                            <tr key={footerIndex}>
                                <td
                                    className={styles["table__footer-cell--key"]}
                                    role="heading"
                                    aria-level={1}
                                    colSpan={footerColSpan}>
                                    {key}
                                </td>
                                <td className={cellClassName}>{cellValue(value, key)}</td>
                            </tr>
                        );
                    })}
                </tfoot>
            )}
        </table>
    );
}

export default ListTable;
