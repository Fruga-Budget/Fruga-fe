import "./Form.css"
import {Expenses, BudgetInfo, } from "../Interfaces"
import { useState } from "react"
import PieChart from "../Pie/Pie";
import { Link, useNavigate   } from "react-router-dom";

interface FormProps {
    onSubmit: (budgetInfo: BudgetInfo) => void;
  }
  const Form: React.FC<FormProps> = ({ onSubmit }) => {
    const [step, setStep] = useState<number>(1);

    const [budgetInfo, setBudgetInfo] = useState<BudgetInfo>({
        grossIncome: 0,
        expenses: {
            wants: [],
            needs: [],
            savings: []
        }
    });
    const navigate = useNavigate()                                                                                                                                                                                                                                                                                                                            
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, category: keyof Expenses | 'grossIncome', index?: number) => {
        const { name, value } = e.target;
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
                        i === index ? { ...item, [name]: name === 'amount' ? parseFloat(value) : value } : item
                    )
                }
            });
        }
    };

    const handleAddExpense = (category: keyof Expenses) => {
        setBudgetInfo({
            ...budgetInfo,
            expenses: {
                ...budgetInfo.expenses,
                [category]: [...budgetInfo.expenses[category], { name: '', amount: 0 }]
            }
        });
    };

    const handleNext = () => setStep(step + 1);
    const handlePrev = () => setStep(step - 1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(budgetInfo)
        localStorage.setItem('budgetInfo', JSON.stringify(budgetInfo));
        navigate('/results');
        
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
                            <div key={index}>
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
                            <div key={index}>
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
                            </div>
                        ))}
                        <button type="button" onClick={() => handleAddExpense('savings')}>Add Saving</button>
                        <button type="button" onClick={handlePrev}>Previous</button>
                        <Link to={'/results'}><button onClick={handleSubmit} type="submit">Submit</button></Link>
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
            <div className="budget">
                    <form className="form" onSubmit={handleSubmit}>
                        {renderStep()}
                    </form>
            </div>
            <div className="pie-chart">
                <PieChart data={transformDataForChart()} />
                <div className="income-view">
                    <h3>Gross Income: {budgetInfo.grossIncome} </h3>
                    <h3 style={netIncomeStyle}>Net Income: {netIncome()} </h3>
                </div>
            </div>
        </div>
    );
};

export default Form