"use client";

import AppLayout from "@/components/layout/AppLayout";
import DashboardGrid from "@/components/dashboard/DashboardGrid";
import DashboardHero from "@/components/dashboard/DashboardHero";
import SpendingByCategoryChart from "@/components/dashboard/SpendingByCategoryChart";
import MonthlySummaryChart from "@/components/dashboard/MonthlySummaryChart";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import BudgetAlerts from "@/components/dashboard/BudgetAlerts";
import { useDashboard } from "@/hooks/useDashboard";

export default function DashboardPage() {
    const {
        summary,
        spendingByCategory,
        monthlySummary,
        recentTransactions,
        budgetAlerts,
        loading,
        error,
    } = useDashboard();

    if (loading) return <main className="p-8">Loading dashboard...</main>;
    if (error) return <main className="p-8 text-red-600">{error}</main>;

    return (
        <AppLayout title="Dashboard">
            <DashboardHero />

            {summary && <DashboardGrid summary={summary} />}

            <BudgetAlerts budgets={budgetAlerts} />

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <SpendingByCategoryChart data={spendingByCategory} />
                <MonthlySummaryChart data={monthlySummary} />
            </div>

            <RecentTransactions transactions={recentTransactions} />
        </AppLayout>
    );
}