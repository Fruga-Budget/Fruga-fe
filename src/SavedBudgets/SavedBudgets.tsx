import './SavedBudgets.css'
import { SavedBudget } from '../Interfaces'
import { useState, useEffect } from 'react'
import mockSavedBudgets from './MockSavedBudgets'




const SavedBudgets: React.FC = () => {  
    const [budgets, setBudgets] = useState<SavedBudget[]>([])
    // const [error, setError] = useState('')
    // const [isLoading, setIsLoading] = useState('')

    useEffect(() => {
        setBudgets(mockSavedBudgets)
        //api call will live here
    }) 
    
    const allUserBudgets: JSX.Element[] = budgets.map((budget) => {
            return (
            <div className='single-budget'>
                <p>Budget #{budget.id}</p>
                <p>Income: ${budget.attributes.total_income}</p>
                <p>Needs: ${budget.attributes.needs_total}</p>
                <p>Wants: ${budget.attributes.wants_total}</p>
                <p>Savings: ${budget.attributes.savings_total}</p>
            </div>
            )
        }) 
    
    return (
        <div className='saved-budgets'>
            {allUserBudgets}
        </div>

    )
}

export default SavedBudgets
