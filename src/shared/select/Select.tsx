import styles from "./Select.module.scss";
import type { SelectProps } from "./Select.types";

function Select({ options, className, ...props }: SelectProps) {
    const selectClassName = [styles.select, className].filter(Boolean).join(" ");

    return (
        <div className={selectClassName}>
            <select
                className={styles.select__field}
                {...props}>
                {options.map((option, index) => (
                    <option
                        key={index}
                        value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Select;
