import styles from "./ListTable.module.scss";
import type { ListTableProps } from "./ListTable.types";
import { formatNumber, isNumber } from "../../utils/number";

function ListTable<T extends object>({
    headers,
    rows,
    footer,
    className,
    cellAlignment,
    isCurrency,
}: ListTableProps<T>) {
    // Checks if there are more keys in either the header or the rows and throws an error if there's a mismatch
    if (headers && rows) {
        const headerLength = headers.length;
        const mismatched = rows.some((row) => Object.keys(row).length !== headerLength);

        if (mismatched)
            throw new Error("One or more rows do not match the header column count in the table.");
    }

    if (headers.length < 2 && footer)
        throw new Error("To use a footer, original table must have at least 2 columns.");

    // Class name(s)
    const tableClassName = [styles.table, className].filter(Boolean).join(" ");
    const cellClassName = [styles.table__cell, styles[`table__cell--${cellAlignment ?? "left"}`]]
        .filter(Boolean)
        .join(" ");

    // Verifies if a cell is a number and a currency and makes sure to put the currency and 2 decimals
    const cellValue = (value: number | string | boolean) =>
        isNumber(value) && isCurrency && value ? `$${formatNumber(value, 2, 2)}` : value;

    // How much do the footer titles span
    const footerColSpan = footer && headers.length > 2 ? headers.length - 1 : 1;

    return (
        <table className={tableClassName}>
            {headers && (
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th
                                key={index}
                                className={styles["table__header-cell"]}>
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
            )}
            {rows && (
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className={styles.table__row}>
                            {Object.values(row).map((value, cellIndex) => (
                                <td
                                    key={cellIndex}
                                    className={cellClassName}>
                                    {cellValue(value)}
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
                                <td className={cellClassName}>{cellValue(value)}</td>
                            </tr>
                        );
                    })}
                </tfoot>
            )}
        </table>
    );
}

export default ListTable;
