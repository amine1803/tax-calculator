import { JSX } from "react";
import styles from "./Input.module.scss";
import { InputProps } from "./Input.types";

/**
 * Input component renders a styled input field with an optional prefix.
 *
 * @param {string | number | readonly string[] | undefined} value - The input value (controlled).
 * @param {string | undefined} prefix - Optional prefix text displayed before the input.
 * @param {React.Ref<HTMLInputElement>} ref - Optional ref to access the input element.
 * @param props - The properties of the Input component.
 * @returns {JSX.Element} An input field with optional prefix and styling.
 */
function Input({ value, prefix, ref, ...props }: InputProps): JSX.Element {
    // Combine base field style with additional style for prefix if present
    const fieldClassName = [styles.input__field, styles["input__field--with-prefix"]].join(" ");

    return (
        <div className={styles.input}>
            {/* Render prefix text if provided */}
            {prefix && <span className={styles.input__prefix}>{prefix}</span>}
            <input
                className={fieldClassName}
                value={value} // Controlled input value
                ref={ref} // Forwarded ref to the input element
                {...props} // Spread additional props such as onChange, placeholder, etc.
            />
        </div>
    );
}

export default Input;
