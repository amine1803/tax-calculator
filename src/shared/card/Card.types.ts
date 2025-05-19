import type { HTMLAttributes } from "react";
import type { ButtonProps } from "../button/Button.types";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    actions?: ButtonProps[];
    actionsPosition?: CardActionsPosition;
    title?: string;
}

export type CardActionsPosition = "left" | "center" | "right";
