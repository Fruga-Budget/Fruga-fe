import './SavedBudgets.css'
import { UserBudget } from '../Interfaces'
import { useState, useEffect } from 'react'


const SavedBudgets: React.FC<UserBudget> = ({user}) => {
    const [budgets, setBudgets] = useState([])

    useEffect(() => {
        setBudgets(user.budgets)
    }) 
    
    const allUserBudgets = budgets.map((budget) => {
            return 
            <div className='single-budget'>
                
            </div>
        }) 
    
    return (
        <div className='saved-budgets'>
            {/* {allUserBudgets} */}
        </div>

    )
}

export default SavedBudgets
