export interface DataSet {
    label: string;
    data: number[];
    backgroundColor: string[];
    hoverOffset: number;
}

export interface GenericPieData {
    labels: string[];
    datasets: DataSet[];
}
export interface LandingPageProps {
    data?: GenericPieData;
}
export interface ExpenseItem {
    name: string;
    amount: number;
}

export interface Expenses {
    wants: ExpenseItem[];
    needs: ExpenseItem[];
    savings: ExpenseItem[];
}

export interface BudgetInfo {
    grossIncome: number;
    expenses: Expenses;
}

export interface UserBudget {
    budgetID: number;
    budgetInfo: BudgetInfo;
    gptAdvice: string[];
}

export interface APIData {
    userID: number;
    userBudgets: UserBudget[];
}
export interface GenericPieData {
    labels: string[];
    datasets: DataSet[];
}
