import styles from "./Table.module.scss";
import type { TableProps } from "./Table.types";

function Table<T extends object>({
    headers,
    rows,
    footer,
    className,
    cellAlignment,
    isCurrency,
}: TableProps<T>) {
    if (headers && rows) {
        const headerLength = headers.length;
        const mismatched = rows.some((row) => Object.keys(row).length !== headerLength);

        if (mismatched)
            throw new Error("One or more rows do not match the header column count in the table.");
    }

    const tableClassName = [styles.table, className].filter(Boolean).join(" ");
    const cellClassName = [styles.table__cell, styles[`table__cell--${cellAlignment ?? "left"}`]]
        .filter(Boolean)
        .join(" ");

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
                            {Object.values(row).map((cell, cellIndex) => (
                                <td
                                    key={cellIndex}
                                    className={cellClassName}>
                                    {typeof cell === "number" && isCurrency && "$"}
                                    {typeof cell === "number" && isCurrency
                                        ? cell.toFixed(2)
                                        : cell}
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
                                    aria-level={1}>
                                    {key}
                                </td>
                                <td className={cellClassName}>
                                    {typeof value === "number" && isCurrency && "$"}
                                    {typeof value === "number" && isCurrency
                                        ? value.toFixed(2)
                                        : value}
                                </td>
                            </tr>
                        );
                    })}
                </tfoot>
            )}
        </table>
    );
}

export default Table;
