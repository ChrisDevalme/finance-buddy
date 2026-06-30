import { useEffect, useState } from "react";
import budgetService from "@/services/budgetService";
import dashboardService from "@/services/dashboardService";
import transactionService from "@/services/transactionService";
import {
    BudgetSummary,
    CategorySpending,
    DashboardSummary,
    MonthlySummary,
    Transaction,
} from "@/types";

export function useDashboard() {
    const [summary, setSummary] = useState<DashboardSummary | null>(null);
    const [spendingByCategory, setSpendingByCategory] = useState<CategorySpending[]>([]);
    const [monthlySummary, setMonthlySummary] = useState<MonthlySummary | null>(null);
    const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
    const [budgetAlerts, setBudgetAlerts] = useState<BudgetSummary[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadDashboard() {
            try {
                const now = new Date();
                const month = now.getMonth() + 1;
                const year = now.getFullYear();

                const [
                    summaryData,
                    spendingData,
                    monthlyData,
                    transactionData,
                    budgetSummaryData,
                ] = await Promise.all([
                    dashboardService.getSummary(),
                    dashboardService.getSpendingByCategory(month, year),
                    dashboardService.getMonthlySummary(month, year),
                    transactionService.getMyTransactions(),
                    budgetService.getMyBudgetSummary(),
                ]);

                setSummary(summaryData);
                setSpendingByCategory(spendingData);
                setMonthlySummary(monthlyData);
                setRecentTransactions(transactionData.slice(0, 5));
                setBudgetAlerts(budgetSummaryData);
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
        recentTransactions,
        budgetAlerts,
        loading,
        error,
    };
}