import React from "react";
import "./SavedBudgets.css";
import { SavedBudget } from "../Interfaces";
import { useState, useEffect } from "react";
import { fetchUserBudgets } from "../API/APICalls";

// import mockSavedBudgets from './MockSavedBudgets'


const SavedBudgets: React.FC = () => {
  const [budgets, setBudgets] = useState<SavedBudget[]>([]);
  const [selectedBudgetId, setSelectedBudgetId] = useState<string | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const userId = localStorage.getItem('userId'); 

    if (!userId) {
        setError("User ID not found in local storage");
        setIsLoading(false);
        return;
      }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const fetchedBudgets = await fetchUserBudgets(userId);
        console.log(fetchedBudgets, 'fethced')
        setBudgets(fetchedBudgets);
      } catch (err) {
        setError("Failed to load budgets");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleBudgetClick = (id: string) => {
    setSelectedBudgetId(id === selectedBudgetId ? null : id);
  };

  const allUserBudgets: JSX.Element[] = budgets.map((budget) => {
    const isSelected = budget.id === selectedBudgetId;

    return (
      <div
        className="single-budget"
        key={budget.id}
        onClick={() => handleBudgetClick(budget.id)}
      >
        <div className="budget-info">
          <p>Budget #{budget.id}</p>
          <p>Income: ${budget.attributes.total_income}</p>
          <p>Needs: ${budget.attributes.needs_total}</p>
          <p>Wants: ${budget.attributes.wants_total}</p>
          <p>Savings: ${budget.attributes.savings_total}</p>
          <button
            className="view-button"
            onClick={() => handleBudgetClick(budget.id)}
          >
            {isSelected ? "Close" : "View"}
          </button>
        </div>
        {isSelected && (
          <div className="budget-details">
            <div>
              <h3>Advice:</h3>
              {budget.attributes.advice.map((advice, index) => (
                <p key={index}>{advice}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <div className="saved-budgets">{allUserBudgets}</div>;
};

export default SavedBudgets;
