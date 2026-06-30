import { useEffect, useState } from "react";
import budgetService from "@/services/budgetService";
import categoryService from "@/services/categoryService";
import { Budget, BudgetRequest, BudgetSummary, Category } from "@/types";

export function useBudgets() {
    const [budgets, setBudgets] = useState<Budget[]>([]);
    const [summary, setSummary] = useState<BudgetSummary[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        try {
            const [budgetData, summaryData, categoryData] = await Promise.all([
                budgetService.getMyBudgets(),
                budgetService.getMyBudgetSummary(),
                categoryService.getMyCategories(),
            ]);

            setBudgets(budgetData);
            setSummary(summaryData);
            setCategories(categoryData);
        } catch {
            setError("Unable to load budgets.");
        } finally {
            setLoading(false);
        }
    }

    async function createBudget(request: BudgetRequest) {
        const newBudget = await budgetService.createBudget(request);
        setBudgets((current) => [...current, newBudget]);

        const updatedSummary = await budgetService.getMyBudgetSummary();
        setSummary(updatedSummary);

        return newBudget;
    }

    return {
        budgets,
        summary,
        categories,
        loading,
        error,
        createBudget,
    };
}