import { useEffect, useState } from "react";
import dashboardService from "@/services/dashboardService";
import {
    CategorySpending,
    DashboardSummary,
    MonthlySummary,
} from "@/types";

export function useDashboard() {
    const [summary, setSummary] = useState<DashboardSummary | null>(null);
    const [spendingByCategory, setSpendingByCategory] = useState<CategorySpending[]>([]);
    const [monthlySummary, setMonthlySummary] = useState<MonthlySummary | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadDashboard() {
            try {
                const now = new Date();
                const month = now.getMonth() + 1;
                const year = now.getFullYear();

                const [summaryData, spendingData, monthlyData] = await Promise.all([
                    dashboardService.getSummary(),
                    dashboardService.getSpendingByCategory(month, year),
                    dashboardService.getMonthlySummary(month, year),
                ]);

                setSummary(summaryData);
                setSpendingByCategory(spendingData);
                setMonthlySummary(monthlyData);
            } catch {
                setError("Unable to load dashboard.");
            } finally {
                setLoading(false);
            }
        }

        loadDashboard();
    }, []);

    return {
        summary,
        spendingByCategory,
        monthlySummary,
        loading,
        error,
    };
}