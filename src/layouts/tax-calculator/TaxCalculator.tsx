import styles from "./TaxCalculator.module.scss";
import { TaxCalculatorLayoutProps } from "./TaxCalculator.types";
import TaxCalculationEffect from "../../components/tax-calculation-effect/TaxCalculationEffect";
import TaxBracketsProvider from "../../contexts/tax-brackets/TaxBrackets.provider";

function TaxCalculatorLayout({ children, title, className, ...props }: TaxCalculatorLayoutProps) {
    // Class name
    const layoutClassName = [styles["tax-calculator"], className].filter(Boolean).join(" ");

    return (
        <div
            className={layoutClassName}
            data-testid="tax-calculator"
            {...props}>
            <TaxBracketsProvider>
                <TaxCalculationEffect />
                <h1 className={styles.title}>{title}</h1>
                {children}
            </TaxBracketsProvider>
        </div>
    );
}

export default TaxCalculatorLayout;
