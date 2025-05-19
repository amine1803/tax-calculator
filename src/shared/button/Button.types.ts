import type { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    variant?: ButtonVariant;
}

export type ButtonVariant = "filled" | "outlined";
