import type { InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";

function Input({ value, prefix, className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
    const wrapperClassName = [styles.input, className].filter(Boolean).join(" ");
    const fieldClassName = [styles.input__field, styles["input__field--with-prefix"]].join(" ");

    return (
        <div className={wrapperClassName}>
            {prefix && <span className={styles.input__prefix}>{prefix}</span>}
            <input
                className={fieldClassName}
                value={value ?? ""}
                {...props}
            />
        </div>
    );
}

export default Input;
