import './SavedBudgets.css'
import { UserBudget } from '../Interfaces'
import { useState, useEffect } from 'react'


const SavedBudgets: React.FC<UserBudget> = () => {  //will need to pass in the user
    const [budgets, setBudgets] = useState<UserBudget[]>([])

    // useEffect(() => {
    //     setBudgets([user.budgets])
    // }) 
    
    // const allUserBudgets = budgets.map((budget) => {
    //         return 
    //         <div className='single-budget'>
                
    //         </div>
    //     }) 
    
    return (
        <div className='saved-budgets'>
            {/* {allUserBudgets} */}
            <h1>This is the saved budget page</h1>
        </div>

    )
}

export default SavedBudgets
