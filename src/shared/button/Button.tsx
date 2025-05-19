import styles from "./Button.module.scss";
import type { ButtonProps } from "./Button.types";

function Button({ label, variant, type, disabled, ...props }: ButtonProps) {
    const buttonClassName = [styles.button, styles[`button--${variant || "filled"}`]].join(" ");

    return (
        <button
            className={buttonClassName}
            aria-label={label}
            type={type ?? "button"}
            {...(disabled && {
                "aria-disabled": disabled,
                "data-disabled": disabled,
                disabled,
            })}
            {...props}>
            {label}
        </button>
    );
}

export default Button;
