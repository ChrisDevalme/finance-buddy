export interface AuthResponse {
    userId: number;
    email: string;
    token: string;
}

export interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface Account {
    id: number;
    name: string;
    type: string;
    balance: number;
    userId: number;
}

export interface AccountRequest {
    name: string;
    type: string;
    balance: number;
}

export interface Category {
    id: number;
    name: string;
    userId: number;
}

export interface CategoryRequest {
    name: string;
}

export interface Transaction {
    id: number;
    description: string;
    amount: number;
    type: "INCOME" | "EXPENSE" | "TRANSFER";
    transactionDate: string;
    notes?: string;
    accountId: number;
    categoryId: number;
}

export interface TransactionRequest {
    description: string;
    amount: number;
    type: "INCOME" | "EXPENSE" | "TRANSFER";
    transactionDate: string;
    notes?: string;
    accountId: number;
    categoryId: number;
}

export interface Budget {
    id: number;
    monthlyLimit: number;
    month: number;
    year: number;
    userId: number;
    categoryId: number;
    categoryName: string;
}

export interface BudgetRequest {
    monthlyLimit: number;
    month: number;
    year: number;
    categoryId: number;
}

export interface DashboardSummary {
    totalBalance: number;
    totalIncome: number;
    totalExpenses: number;
    netCashFlow: number;
}

export interface MonthlySummary {
    totalIncome: number;
    totalExpenses: number;
    netCashFlow: number;
    month: number;
    year: number;
}

export interface CategorySpending {
    categoryName: string;
    totalSpent: number;
}

export interface BudgetSummary {
    budgetId: number;
    categoryName: string;
    monthlyLimit: number;
    amountSpent: number;
    remaining: number;
    month: number;
    year: number;
}