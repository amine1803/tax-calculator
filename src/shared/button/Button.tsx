import { JSX } from "react";
import styles from "./Button.module.scss";
import type { ButtonProps } from "./Button.types";

/**
 * Button component renders a customizable button with variant styles.
 *
 * @param {string} label - The text to display inside the button.
 * @param {string} variant - The style variant of the button (e.g., "filled", "outlined").
 * @param {string} type - The HTML button type ("button", "submit", etc.).
 * @param {boolean} disabled - Whether the button is disabled.
 * @param props - Additional props passed to the button element.
 * @returns {JSX.Element} A button element with styling and accessibility attributes.
 */
function Button({ label, variant, type, disabled, ...props }: ButtonProps): JSX.Element {
    // Compute the button's class name based on the variant prop (default to "filled")
    const buttonClassName = [styles.button, styles[`button--${variant || "filled"}`]].join(" ");

    return (
        <button
            className={buttonClassName}
            aria-label={label}
            type={type ?? "button"}
            // Conditionally add accessibility and disabled attributes if disabled is true
            {...(disabled && {
                "aria-disabled": disabled,
                "data-disabled": disabled,
                disabled,
            })}
            {...props}>
            {/* Display the button label */}
            {label}
        </button>
    );
}

export default Button;
