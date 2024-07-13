import "./Results.css";
import PieChart from "../Pie/Pie";
import { useEffect, useState } from "react";
import { ExpenseItem, UserBudget, GenericPieData, Expenses } from "../Interfaces";
import { Link } from "react-router-dom";

const getUserBudgetFromLocalStorage = (): UserBudget | null => {
    const storedBudget = localStorage.getItem('userBudget');
    if (storedBudget) {
        console.log("Retrieved budget from local storage:", JSON.parse(storedBudget));
        return JSON.parse(storedBudget) as UserBudget; // Parse and return as UserBudget
    } else {
        console.log("No budget found in local storage.");
        return null;
    }
};

const Results: React.FC = () => {
    const [userBudget, setUserBudget] = useState<UserBudget | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    useEffect(() => {
        const storedBudget = getUserBudgetFromLocalStorage();
        if (storedBudget) {
            setUserBudget(storedBudget);
        }
    }, []);

    const transformDataForChart = (): GenericPieData | undefined => {
        if (!userBudget) return undefined;

        const { wants, needs, savings } = userBudget.budgetInfo.expenses;
        const totalWants = calculateTotalAmount(wants);
        const totalNeeds = calculateTotalAmount(needs);
        const totalSavings = calculateTotalAmount(savings);

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

    const calculateTotalAmount = (expenses: ExpenseItem[]): number => {
        return expenses.reduce((sum, item) => sum + item.amount, 0);
    };

    const netIncome = () => {
        if (!userBudget) return 0;

        const { grossIncome, expenses } = userBudget.budgetInfo;
        const totalExpenses = calculateTotalAmount(expenses.needs) + calculateTotalAmount(expenses.wants) + calculateTotalAmount(expenses.savings);
        return grossIncome - totalExpenses;
    };

    const netIncomeValue = netIncome();
    const netIncomeStyle = {
        color: netIncomeValue > 0 ? 'green' : netIncomeValue < 0 ? 'red' : 'black'
    };

    const toggleEditMode = () => {
        setIsEditing(prev => !prev);
    };

    const handleExpenseNameChange = (e: React.ChangeEvent<HTMLInputElement>, category: keyof Expenses, index: number) => {
        if (!userBudget) return;

        const updatedBudget = { ...userBudget };
        updatedBudget.budgetInfo.expenses[category][index].name = e.target.value;
        setUserBudget(updatedBudget);
    };

    const handleExpenseAmountChange = (e: React.ChangeEvent<HTMLInputElement>, category: keyof Expenses, index: number) => {
        if (!userBudget) return;

        const updatedBudget = { ...userBudget };
        updatedBudget.budgetInfo.expenses[category][index].amount = parseFloat(e.target.value);
        setUserBudget(updatedBudget);
    };

    const clearLocalStorage = () => {
        localStorage.removeItem('userBudget');
        setUserBudget(null);
        console.log("Cleared budget from local storage.");
    };

    return (
        <>
            <div className="results">
                <div>
                    {userBudget ? (
                        <div className="full-budget">
                            <div className="budget-header">
                                <h3>Budget</h3>
                                <button className="edit" onClick={toggleEditMode}>
                                    {isEditing ? 'Save' : 'Edit'}
                                </button>
                                <button className="clear" onClick={clearLocalStorage}>
                                    Clear Data
                                </button>
                            </div>
                            <div className="budget-data">
                                <h5>Gross Income: {userBudget.budgetInfo.grossIncome}</h5>
                                {isEditing ? (
                                    <>
                                        <div>
                                            <h5>Needs</h5>
                                            <ul>
                                                {userBudget.budgetInfo.expenses.needs.map((expense, index) => (
                                                    <li key={index}>
                                                        <input
                                                            type="text"
                                                            value={expense.name}
                                                            onChange={(e) => handleExpenseNameChange(e, 'needs', index)}
                                                        />
                                                        <input
                                                            type="number"
                                                            value={expense.amount}
                                                            onChange={(e) => handleExpenseAmountChange(e, 'needs', index)}
                                                        />
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h5>Wants</h5>
                                            <ul>
                                                {userBudget.budgetInfo.expenses.wants.map((expense, index) => (
                                                    <li key={index}>
                                                        <input
                                                            type="text"
                                                            value={expense.name}
                                                            onChange={(e) => handleExpenseNameChange(e, 'wants', index)}
                                                        />
                                                        <input
                                                            type="number"
                                                            value={expense.amount}
                                                            onChange={(e) => handleExpenseAmountChange(e, 'wants', index)}
                                                        />
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h5>Savings</h5>
                                            <ul>
                                                {userBudget.budgetInfo.expenses.savings.map((expense, index) => (
                                                    <li key={index}>
                                                        <input
                                                            type="text"
                                                            value={expense.name}
                                                            onChange={(e) => handleExpenseNameChange(e, 'savings', index)}
                                                        />
                                                        <input
                                                            type="number"
                                                            value={expense.amount}
                                                            onChange={(e) => handleExpenseAmountChange(e, 'savings', index)}
                                                        />
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div>
                                            <h5>Needs</h5>
                                            <ul>
                                                {userBudget.budgetInfo.expenses.needs.map((expense, index) => (
                                                    <li key={index}>{expense.name}: {expense.amount}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h5>Wants</h5>
                                            <ul>
                                                {userBudget.budgetInfo.expenses.wants.map((expense, index) => (
                                                    <li key={index}>{expense.name}: {expense.amount}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h5>Savings</h5>
                                            <ul>
                                                {userBudget.budgetInfo.expenses.savings.map((expense, index) => (
                                                    <li key={index}>{expense.name}: {expense.amount}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </>
                                )}
                                <h5 style={netIncomeStyle}>Net Income: {netIncomeValue}</h5>
                            </div>
                        </div>
                    ) : (
                        <p>No budget data available.</p>
                    )}
                </div>
                <div className="">
                    {userBudget && <PieChart data={transformDataForChart() as GenericPieData} />}
                </div>
            </div>
            <div className="suggestion">
                <h4>Suggestions</h4>
                <ul>
                    {userBudget?.gptAdvice.map((advice, index) => (
                        <li key={index}>{advice}</li>
                    ))}
                </ul>
            </div>
            <Link to={'/getting-started'}><button>Go Back!</button></Link>
        </>
    );
};

export default Results;
