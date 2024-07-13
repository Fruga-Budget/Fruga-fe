import {APIData} from'../Interfaces'
const mockBudget: APIData = {
    userID: 0,
    userBudgets: [
      {
        budgetID: 0,
        budgetInfo: {
          grossIncome: 5000,
          expenses: {
            wants: [
              { name: 'Dining Out', amount: 150 },
              { name: 'Entertainment', amount: 100 }
            ],
            needs: [
              { name: 'Rent', amount: 1200 },
              { name: 'Utilities', amount: 300 }
            ],
            savings: [
              { name: 'Emergency Fund', amount: 200 },
              { name: 'Retirement', amount: 300 }
            ]
          }
        },
        gptAdvice: [
          'Reduce dining out expenses',
          'Consider switching to a cheaper utility provider',
          'Increase contribution to the emergency fund'
        ]
      }
    ]
  };

  export default mockBudget