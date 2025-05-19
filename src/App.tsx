import styles from "./App.module.scss";
import TaxCalculationEffect from "./components/tax-calculation-effect/TaxCalculationEffect";
import TaxCalculationForm from "./components/tax-calculation-form/TaxCalculationForm";
import TaxCalculationTable from "./components/tax-calculation-table/TaxCalculationTable";
import TaxBracketsProvider from "./contexts/tax-brackets/TaxBrackets.provider";

function App() {
    return (
        <TaxBracketsProvider>
            <h1 className={styles.title}>Tax Calculator</h1>
            <TaxCalculationEffect />
            <TaxCalculationForm />
            <TaxCalculationTable />
        </TaxBracketsProvider>
    );
}

export default App;
