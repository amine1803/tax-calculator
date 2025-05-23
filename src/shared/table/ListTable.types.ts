import type { HTMLAttributes } from "react";

export interface ListTableProps<T extends object> extends HTMLAttributes<HTMLTableElement> {
    header: string[];
    rows: T[];
    footer?: Record<string, string | number | boolean>[];
    cellAlignment?: ListTableAlignment;
    currencyHeaderAndFooter?: string[];
}

export type ListTableAlignment = "left" | "center" | "right";
