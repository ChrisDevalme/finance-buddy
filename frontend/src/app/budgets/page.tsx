"use client";

import AppLayout from "@/components/layout/AppLayout";
import BudgetForm from "@/components/budgets/BudgetForm";
import BudgetList from "@/components/budgets/BudgetList";
import { useBudgets } from "@/hooks/useBudgets";

export default function BudgetsPage() {
    const { summary, categories, loading, error, createBudget } = useBudgets();

    if (loading) return <main className="p-8">Loading budgets...</main>;
    if (error) return <main className="p-8 text-red-600">{error}</main>;

    return (
        <AppLayout title="Budgets">
            <BudgetForm categories={categories} onBudgetCreated={createBudget} />
            <BudgetList summary={summary} />
        </AppLayout>
    );
}