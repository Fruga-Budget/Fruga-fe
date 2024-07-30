import './SavedBudgets.css'
import { SavedBudget } from '../Interfaces'
import { useState, useEffect } from 'react'

const mockSavedBudgets: SavedBudget =[
    {
        id: "1",
        type: "advice",
        attributes: {
          total_income: 5000,
          needs_total: 2500,
          wants_total: 1700,
          savings_total: 1000,
          expenses: {
            needs: [
              {
                name: "Rent",
                amount: 1500,
                description: "On a lease, this can't be changed!",
                isNegotiable: false
              },
              {
                name: "Utilities",
                amount: 500,
                description: "",
                isNegotiable: true
              },
              {
                name: "Misc.",
                amount: 500,
                description: "Food Budget, Gas",
                isNegotiable: false
              }
            ],
            wants: [
              {
                name: "Dining Out",
                amount: 500,
                description: "Yummy!"
              },
              {
                name: "Entertainment",
                amount: 500,
                description: "Going to the movies is important to me"
              },
              {
                name: "Starbucks Coffee",
                amount: 200,
                description: "I don't know how to make coffee"
              },
              {
                name: "Shoes",
                amount: 500,
                description: "Every time I drive by DSW I buy shoes"
              }
            ],
            savings: [
              {
                name: "401k",
                amount: 200,
                description: "Deposited from paycheck at work."
              },
              {
                name: "Savings Account",
                amount: 800,
                description: "0.5% apr"
              }
            ]
          },
          advice: [
            "Based on the user's current budget breakdown, they are not following the 50/30/20 rule",
            "Here are some specific recommendations on how they can adjust their budget:\n\n1",
            "**Rent** (Fixed - Not Negotiable): 30% of income is already allocated.\n2",
            "**Utilities** (Variable - Negotiable): Consider reducing usage to lower costs.\n3",
            "**Miscellaneous** (Fixed - Not Negotiable): 10% of income is already allocated.\n4",
            "**Wants Total**: Currently 30% of income, exceeding the recommended 30%.\n\nTo meet the 50/30/20 rule, the user can consider the following changes:\n- **Dining Out**: Reduce to $250.\n- **Entertainment**: Reduce to $250.\n- **Starbucks Coffee**: Reduce to $100.\n- **Shoes**: Reduce to $250.\n\nRevised Budget Breakdown:\n- Needs: $2500 (Rent: $1500, Utilities: $250, Misc.: $750)\n- Wants: $1250 (Dining Out: $250, Entertainment: $250, Starbucks Coffee: $100, Shoes: $250)\n- Savings: $1250 (401k: $200, Savings"
          ]
        }
      },
      {
        id: "2",
        type: "advice",
        attributes: {
          total_income: 7000,
          needs_total: 4000,
          wants_total: 1700,
          savings_total: 1000,
          expenses: {
            needs: [
              {
                name: "Rent",
                amount: 3000,
                description: "On a lease, this can't be changed!",
                isNegotiable: false
              },
              {
                name: "Utilities",
                amount: 500,
                description: "",
                isNegotiable: true
              },
              {
                name: "Misc.",
                amount: 500,
                description: "Food Budget, Gas",
                isNegotiable: false
              }
            ],
            wants: [
              {
                name: "Dining Out",
                amount: 500,
                description: "Yummy!"
              },
              {
                name: "Entertainment",
                amount: 500,
                description: "Going to the movies is important to me"
              },
              {
                name: "Starbucks Coffee",
                amount: 200,
                description: "I don't know how to make coffee"
              },
              {
                name: "Shoes",
                amount: 500,
                description: "Every time I drive by DSW I buy shoes"
              }
            ],
            savings: [
              {
                name: "401k",
                amount: 200,
                description: "Deposited from paycheck at work."
              },
              {
                name: "Savings Account",
                amount: 800,
                description: "0.5% apr"
              }
            ]
          },
          advice: [
            "User's current budget breakdown:\n- Needs: $4000 (Rent $3000, Utilities $500, Misc",
            "$500)\n- Wants: $1700 (Dining Out $500, Entertainment $500, Starbucks Coffee $200, Shoes $500)\n- Savings: $1000 (401k $200, Savings Account $800)\n\nTotal expenses: $6700\nTotal savings: $1000\n\nUser's current budget does not match the 50/30/20 rule",
            "To adjust, consider:\n1",
            "Reduce spending on wants such as Dining Out, Entertainment, Starbucks Coffee, and Shoes.\n2",
            "Increase savings contribution if possible.\n3",
            "Negotiate Utilities and explore ways to decrease Misc",
            "expenses.\n\nRevised budget breakdown to meet 50/30/20 rule:\n- Needs: $3500 (Rent $3000, Utilities $300, Misc",
            "$200)\n- Wants: $2100 (Dining Out $300, Entertainment $300, Starbucks Coffee $100, Shoes $1400)\n- Savings: $1400\n\nTotal expenses: $7000\nTotal savings: $1400\n\nThis adjusted budget aligns more closely with the 50/30/20 rule by allocating 50%"
          ]
        }
      }
]


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
