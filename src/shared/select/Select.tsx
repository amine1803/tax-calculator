import { JSX } from "react";
import styles from "./Select.module.scss";
import type { SelectProps } from "./Select.types";

/**
 * Select component renders a styled select dropdown with given options.
 *
 * @param {string[]} options - The list of options to display in the dropdown.
 * @param props - Additional properties passed to the select element.
 * @returns {JSX.Element} A styled select dropdown.
 */
function Select({ options, ...props }: SelectProps): JSX.Element {
    return (
        <div className={styles.select}>
            {/* Render the select dropdown with applied styles and props */}
            <select
                className={styles.select__field}
                {...props}>
                {/* Map options array to <option> elements */}
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
