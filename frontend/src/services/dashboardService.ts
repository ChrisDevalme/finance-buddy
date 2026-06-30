import api from "./api";
import {
    DashboardSummary,
    MonthlySummary,
    CategorySpending,
} from "@/types";

class DashboardService {
    async getSummary(): Promise<DashboardSummary> {
        const response = await api.get<DashboardSummary>("/api/dashboard/me");
        return response.data;
    }

    async getMonthlySummary(month: number, year: number): Promise<MonthlySummary> {
        const response = await api.get<MonthlySummary>(
            `/api/dashboard/me/monthly-summary?month=${month}&year=${year}`
        );

        return response.data;
    }

    async getSpendingByCategory(
        month: number,
        year: number
    ): Promise<CategorySpending[]> {
        const response = await api.get<CategorySpending[]>(
            `/api/dashboard/me/spending-by-category?month=${month}&year=${year}`
        );

        return response.data;
    }
}

export default new DashboardService();