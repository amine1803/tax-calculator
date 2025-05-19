import type { HTMLAttributes } from "react";

export interface TableProps<T extends object> extends HTMLAttributes<HTMLTableElement> {
    headers: string[];
    rows: T[];
    footer?: Record<string, string | number | boolean>[];
    cellAlignment?: TableAlignment;
    isCurrency?: boolean;
}

export type TableAlignment = "left" | "center" | "right";
