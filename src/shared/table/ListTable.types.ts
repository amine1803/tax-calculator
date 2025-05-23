import type { HTMLAttributes } from "react";

export interface ListTableProps<T extends object> extends HTMLAttributes<HTMLTableElement> {
    headers: string[];
    rows: T[];
    footer?: Record<string, string | number | boolean>[];
    cellAlignment?: ListTableAlignment;
    isCurrency?: boolean;
}

export type ListTableAlignment = "left" | "center" | "right";
