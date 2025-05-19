import { InputHTMLAttributes, KeyboardEventHandler } from "react";
import styles from "./Input.module.scss";

function Input({
    value,
    prefix,
    className,
    type,
    onKeyDown,
    ...props
}: InputHTMLAttributes<HTMLInputElement>) {
    // Class name(s)
    const wrapperClassName = [styles.input, className].filter(Boolean).join(" ");
    const fieldClassName = [styles.input__field, styles["input__field--with-prefix"]].join(" ");

    // Prevents the user to type usual acceptable characters for a number input since we only use positive ones
    const onInputKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (type === "number" && ["-", "e", "E", "+"].includes(event.key)) event.preventDefault();
        onKeyDown?.(event);
    };

    return (
        <div className={wrapperClassName}>
            {prefix && <span className={styles.input__prefix}>{prefix}</span>}
            <input
                className={fieldClassName}
                value={value}
                onKeyDown={onInputKeyDown}
                {...props}
            />
        </div>
    );
}

export default Input;
