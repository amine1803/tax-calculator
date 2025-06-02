import { InputHTMLAttributes, RefObject } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    isCurrency?: boolean;
    ref?: RefObject<HTMLInputElement | null>;
}
