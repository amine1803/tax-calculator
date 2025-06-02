import styles from "./Select.module.scss";
import type { SelectProps } from "./Select.types";

function Select({ options, ...props }: SelectProps) {
    return (
        <div className={styles.select}>
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
