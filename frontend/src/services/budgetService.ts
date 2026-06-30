import api from "./api";
import { Budget, BudgetRequest, BudgetSummary } from "@/types";

class BudgetService {
    async getMyBudgets(): Promise<Budget[]> {
        const response = await api.get<Budget[]>("/api/budgets/me");
        return response.data;
    }

    async getMyBudgetSummary(): Promise<BudgetSummary[]> {
        const response = await api.get<BudgetSummary[]>("/api/budgets/me/summary");
        return response.data;
    }

    async createBudget(request: BudgetRequest): Promise<Budget> {
        const response = await api.post<Budget>("/api/budgets", request);
        return response.data;
    }
}

export default new BudgetService();