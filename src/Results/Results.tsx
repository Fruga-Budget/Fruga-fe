import "./Results.css";
import PieChart from "../Pie/Pie";
import { useLocation } from "react-router-dom";
import { BudgetInfo } from "../Interfaces";

const Results: React.FC = () => {
    const location = useLocation();
    const budgetInfo = location.state as BudgetInfo;

    const transformDataForChart = () => {
        const { wants, needs, savings } = budgetInfo.expenses;
        const totalWants = wants.reduce((sum, item) => sum + item.amount, 0);
        const totalNeeds = needs.reduce((sum, item) => sum + item.amount, 0);
        const totalSavings = savings.reduce((sum, item) => sum + item.amount, 0);
        
        return {
            labels: ['Needs', 'Wants', 'Savings'],
            datasets: [
                {
                    label: 'Expenses',
                    data: [totalNeeds, totalWants, totalSavings],
                    backgroundColor: [
                        "rgba(19, 141, 117, 0.9)",
                        "rgba(84, 153, 199, 0.9)",
                        "rgba(91, 124, 153, 0.9)"
                    ],
                    hoverOffset: 4
                }
            ]
        };
    };

    const netIncome = () => {
        const { wants, needs, savings } = budgetInfo.expenses;
        const totalWants = wants.reduce((sum, item) => sum + item.amount, 0);
        const totalNeeds = needs.reduce((sum, item) => sum + item.amount, 0);
        const totalSavings = savings.reduce((sum, item) => sum + item.amount, 0);
        const totalExpenses = totalWants + totalNeeds + totalSavings;
        return budgetInfo.grossIncome - totalExpenses;
    };

    const netIncomeValue = netIncome();
    const netIncomeStyle = {
        color: netIncomeValue > 0 ? 'green' : netIncomeValue < 0 ? 'red' : 'black'
    };

    return(
        <>
            <div className="full-budget">
                <div className="budget-header">
                    <h3>Budget</h3>
                    <button className="edit">Edit</button>
                </div>
                <div className="budget-data">
                    <h5>Gross Income: {budgetInfo.grossIncome}</h5>
                    <div>
                        <h5>Needs</h5>
                        <ul>
                            {budgetInfo.expenses.needs.map((expense, index) => (
                                <li key={index}>{expense.name}: {expense.amount}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h5>Wants</h5>
                        <ul>
                            {budgetInfo.expenses.wants.map((expense, index) => (
                                <li key={index}>{expense.name}: {expense.amount}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h5>Savings</h5>
                        <ul>
                            {budgetInfo.expenses.savings.map((expense, index) => (
                                <li key={index}>{expense.name}: {expense.amount}</li>
                            ))}
                        </ul>
                    </div>
                    <h5 style={netIncomeStyle}>Net Income: {netIncomeValue}</h5>
                </div>
            </div>
            <PieChart data={transformDataForChart()} />
        </>
    );
}

export default Results;
