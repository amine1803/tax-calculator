import TaxCalculationForm from "./components/tax-calculation-form/TaxCalculationForm";
import TaxCalculationTable from "./components/tax-calculation-table/TaxCalculationTable";
import TaxCalculator from "./layouts/tax-calculator/TaxCalculator";

function App() {
    return (
        <TaxCalculator title="Tax Calculator">
            <TaxCalculationForm />
            <TaxCalculationTable />
        </TaxCalculator>
    );
}

export default App;
