"use client";

import { useEffect, useState } from "react";
import budgetService from "@/services/budgetService";
import categoryService from "@/services/categoryService";
import { Budget, BudgetSummary, Category } from "@/types";
import AppLayout from "@/components/layout/AppLayout";
import BudgetForm from "@/components/budgets/BudgetForm";
import BudgetList from "@/components/budgets/BudgetList";

export default function BudgetsPage() {
    const [budgets, setBudgets] = useState<Budget[]>([]);
    const [summary, setSummary] = useState<BudgetSummary[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            const [budgetData, summaryData, categoryData] = await Promise.all([
                budgetService.getMyBudgets(),
                budgetService.getMyBudgetSummary(),
                categoryService.getMyCategories(),
            ]);

            setBudgets(budgetData);
            setSummary(summaryData);
            setCategories(categoryData);
            setLoading(false);
        }

        loadData();
    }, []);

    async function handleBudgetCreated(budget: Budget) {
        setBudgets([...budgets, budget]);

        const updatedSummary = await budgetService.getMyBudgetSummary();
        setSummary(updatedSummary);
    }

    if (loading) {
        return <main className="p-8">Loading budgets...</main>;
    }

    return (
        <AppLayout title="Budgets">
            <BudgetForm
                categories={categories}
                onBudgetCreated={handleBudgetCreated}
            />

            <BudgetList summary={summary} />
        </AppLayout>
    );
}