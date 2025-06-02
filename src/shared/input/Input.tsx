import styles from "./Input.module.scss";
import { InputProps } from "./Input.types";

function Input({ value, prefix, ref, ...props }: InputProps) {
    const fieldClassName = [styles.input__field, styles["input__field--with-prefix"]].join(" ");

    return (
        <div className={styles.input}>
            {prefix && <span className={styles.input__prefix}>{prefix}</span>}
            <input
                className={fieldClassName}
                value={value}
                ref={ref}
                {...props}
            />
        </div>
    );
}

export default Input;
