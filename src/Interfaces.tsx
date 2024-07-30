//what pie chart data is 
export interface DataSet {
    label: string;
    data: number[];
    backgroundColor: string[];
    hoverOffset: number;
}
//what the pie chart's data should look like
export interface GenericPieData {
    labels: string[];
    datasets: DataSet[];
}
//landing page prop
export interface LandingPageProps {
    data?: GenericPieData;
}
//defines an expense item
export interface ExpenseItem {
    name: string;
    amount: number;
    description: string; 
    negotiable: boolean; 
}

//what expenses look like
export interface Expenses {
    wants: ExpenseItem[];
    needs: ExpenseItem[];
    savings: ExpenseItem[];
}
//what a user's budget should look like
export interface BudgetInfo {
    grossIncome: number;
    expenses: Expenses;
}
//defines a user
export interface UserBudget {
    budgetID: number;
    budgetInfo: BudgetInfo;
    gptAdvice: string[];
}
//what the api post should have
export interface APIData {
    userID: number;
    userBudgets: UserBudget[];
}

//what the data coming from fetching a users saved budgets will look like
export interface SavedBudget {
    id: string;
    type: string;
    attributes: {
        total_income: number;
        needs_total: number;
        wants_total: number;
        savings_total: number;
        expenses: {
            needs: Array<{
                name: string;
                amount: number;
                description: string;
                isNegotiable: boolean;
            }>;
            wants: Array<{
                name: string;
                amount: number;
                description: string;
            }>;
            savings: Array<{
                name: string;
                amount: number;
                description: string;
            }>;
        };
        advice: string[];
    };
}




