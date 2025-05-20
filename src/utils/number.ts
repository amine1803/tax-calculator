// Checks if a value is a number
export function isNumber(value: unknown): value is number {
    return typeof value === "number" && !isNaN(value);
}

// Formats a number with decimals and commas
export function formatNumber(
    value: number,
    maximumFractionDigits?: number,
    minimumFractionDigits?: number,
) {
    return value.toLocaleString(undefined, { maximumFractionDigits, minimumFractionDigits });
}
