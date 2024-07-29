import "./Form.css";
import { Expenses, BudgetInfo, ExpenseItem } from "../Interfaces";
import { useState } from "react";
import PieChart from "../Pie/Pie";
import { Link, useNavigate } from "react-router-dom";

interface FormProps {
    onSubmit: (budgetInfo: BudgetInfo) => void;
}

const Form: React.FC<FormProps> = ({ onSubmit }) => {
    const [step, setStep] = useState<number>(1);

    const [budgetInfo, setBudgetInfo] = useState<BudgetInfo>({
        grossIncome: 0,
        expenses: {
            needs: [],
            wants: [],
            savings: []
        }
    });

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, category: keyof Expenses | 'grossIncome', index?: number) => {
        const target = e.target as HTMLInputElement;
        const { name, value, type, checked } = target;

        if (category === 'grossIncome') {
            setBudgetInfo({
                ...budgetInfo,
                grossIncome: parseFloat(value)
            });
        } else if (index !== undefined) {
            setBudgetInfo({
                ...budgetInfo,
                expenses: {
                    ...budgetInfo.expenses,
                    [category]: budgetInfo.expenses[category].map((item, i) =>
                        i === index
                            ? { ...item, [name]: type === 'checkbox' ? checked : name === 'amount' ? parseFloat(value) : value }
                            : item
                    )
                }
            });
        }
    };

    const handleAddExpense = (category: keyof Expenses) => {
        const newExpense: ExpenseItem = { name: '', amount: 0, description: '', negotiable: false }; // Default negotiable is false
        setBudgetInfo({
            ...budgetInfo,
            expenses: {
                ...budgetInfo.expenses,
                [category]: [...budgetInfo.expenses[category], newExpense]
            }
        });
    };

    const handleNext = () => setStep(step + 1);
    const handlePrev = () => setStep(step - 1);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const requestBody = {
            total_income: budgetInfo.grossIncome,
            needs: budgetInfo.expenses.needs.map(expense => ({
                name: expense.name,
                cost: expense.amount,
                description: expense.description || '',
                isNegotiable: expense.negotiable
            })),
            wants: budgetInfo.expenses.wants.map(expense => ({
                name: expense.name,
                cost: expense.amount,
                description: expense.description || ''
            })),
            savings: budgetInfo.expenses.savings.map(expense => ({
                name: expense.name,
                cost: expense.amount,
                description: expense.description || ''
            }))
        };

        try {
            const response = await fetch(`https://fruga-be-340d88ac3f29.herokuapp.com/api/v1/users/:user_id/advices`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const responseData = await response.json();
            console.log('Success:', responseData);
            onSubmit(budgetInfo);
            localStorage.setItem('budgetInfo', JSON.stringify(budgetInfo));
            navigate(`${responseData.data.id}/results`);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDeleteExpense = (category: keyof Expenses, index: number) => {
        setBudgetInfo({
            ...budgetInfo,
            expenses: {
                ...budgetInfo.expenses,
                [category]: budgetInfo.expenses[category].filter((_, i) => i !== index)
            }
        });
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="form">
                        <div className="input-group">
                            <label>Gross Income</label>
                            <input
                                type="number"
                                name="grossIncome"
                                value={budgetInfo.grossIncome}
                                onChange={(e) => handleChange(e, 'grossIncome')}
                            />
                        </div>
                        <button type="button" onClick={handleNext}>Next</button>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <h3>Needs</h3>
                        {budgetInfo.expenses.needs.map((expense, index) => (
                            <div key={index} className="inputs">
                                <div className="input-group">
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={expense.name}
                                        onChange={(e) => handleChange(e, 'needs', index)}
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Amount</label>
                                    <input
                                        type="number"
                                        name="amount"
                                        value={expense.amount}
                                        onChange={(e) => handleChange(e, 'needs', index)}
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Description</label>
                                    <input
                                        type="text"
                                        name="description"
                                        value={expense.description}
                                        onChange={(e) => handleChange(e, 'needs', index)}
                                    />
                                </div>
                                <div className="input-group">
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="negotiable"
                                            checked={expense.negotiable}
                                            onChange={(e) => handleChange(e, 'needs', index)}
                                        />
                                        Negotiable
                                    </label>
                                </div>
                                <button type="button" onClick={() => handleDeleteExpense('needs', index)}>Delete</button>
                            </div>
                        ))}
                        <button type="button" onClick={() => handleAddExpense('needs')}>Add Need</button>
                        <button type="button" onClick={handlePrev}>Previous</button>
                        <button type="button" onClick={handleNext}>Next</button>
                    </div>
                );
            case 3:
                return (
                    <div>
                        <h3>Wants</h3>
                        {budgetInfo.expenses.wants.map((expense, index) => (
                            <div key={index} className="inputs">
                                <div className="input-group">
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={expense.name}
                                        onChange={(e) => handleChange(e, 'wants', index)}
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Amount</label>
                                    <input
                                        type="number"
                                        name="amount"
                                        value={expense.amount}
                                        onChange={(e) => handleChange(e, 'wants', index)}
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Description</label>
                                    <input
                                        type="text"
                                        name="description"
                                        value={expense.description}
                                        onChange={(e) => handleChange(e, 'wants', index)}
                                    />
                                </div>
                                <button type="button" onClick={() => handleDeleteExpense('wants', index)}>Delete</button>
                            </div>
                        ))}
                        <button type="button" onClick={() => handleAddExpense('wants')}>Add Want</button>
                        <button type="button" onClick={handlePrev}>Previous</button>
                        <button type="button" onClick={handleNext}>Next</button>
                    </div>
                );
            case 4:
                return (
                    <div>
                        <h3>Savings</h3>
                        {budgetInfo.expenses.savings.map((expense, index) => (
                            <div key={index} className="inputs">
                                <div className="input-group">
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={expense.name}
                                        onChange={(e) => handleChange(e, 'savings', index)}
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Amount</label>
                                    <input
                                        type="number"
                                        name="amount"
                                        value={expense.amount}
                                        onChange={(e) => handleChange(e, 'savings', index)}
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Description</label>
                                    <input
                                        type="text"
                                        name="description"
                                        value={expense.description}
                                        onChange={(e) => handleChange(e, 'savings', index)}
                                    />
                                </div>
                                <button type="button" onClick={() => handleDeleteExpense('savings', index)}>Delete</button>
                            </div>
                        ))}
                        <button type="button" onClick={() => handleAddExpense('savings')}>Add Saving</button>
                        <button type="button" onClick={handlePrev}>Previous</button>
                        <Link to={'/results'}>
                            <button onClick={handleSubmit} type="submit">Submit</button>
                        </Link>
                    </div>
                );
            default:
                return null;
        }
    };

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

    return (
        <div className="container">
            <div className="pie-chart">
                <PieChart data={transformDataForChart()} />
                <div className="income-view">
                    <div>
                        <h3>Gross Income: {budgetInfo.grossIncome}</h3>
                    </div>
                    <div className="net">
                        <h3 style={netIncomeStyle}>Net Income: {netIncome()}</h3>
                    </div>
                </div>
                <div className="budget">
                    <form className="form" onSubmit={handleSubmit}>
                        {renderStep()}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Form;
