// Checks if a value is a number
export function isNumber(value: unknown): value is number {
    return typeof value === "number" && !isNaN(value);
}
