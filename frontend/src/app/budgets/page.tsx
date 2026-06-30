"use client";

import { useEffect, useState } from "react";
import budgetService from "@/services/budgetService";
import categoryService from "@/services/categoryService";
import { Budget, BudgetSummary, Category } from "@/types";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function BudgetsPage() {
    const [budgets, setBudgets] = useState<Budget[]>([]);
    const [summary, setSummary] = useState<BudgetSummary[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    const [monthlyLimit, setMonthlyLimit] = useState("");
    const [month, setMonth] = useState("6");
    const [year, setYear] = useState("2026");
    const [categoryId, setCategoryId] = useState("");

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
        }

        loadData();
    }, []);

    async function handleCreateBudget(e: React.FormEvent) {
        e.preventDefault();

        const newBudget = await budgetService.createBudget({
            monthlyLimit: Number(monthlyLimit),
            month: Number(month),
            year: Number(year),
            categoryId: Number(categoryId),
        });

        setBudgets([...budgets, newBudget]);

        const updatedSummary = await budgetService.getMyBudgetSummary();
        setSummary(updatedSummary);

        setMonthlyLimit("");
        setCategoryId("");
    }

    return (
        <ProtectedRoute>
            <Navbar />
        <main className="min-h-screen bg-gray-100 p-8">

            <h1 className="text-3xl font-bold mb-6">Budgets</h1>

            <form
                onSubmit={handleCreateBudget}
                className="bg-white p-6 rounded-lg shadow mb-6 grid gap-4"
            >
                <h2 className="text-xl font-bold">Add Budget</h2>

                <input
                    className="border p-3 rounded"
                    type="number"
                    placeholder="Monthly limit"
                    value={monthlyLimit}
                    onChange={(e) => setMonthlyLimit(e.target.value)}
                />

                <input
                    className="border p-3 rounded"
                    type="number"
                    placeholder="Month"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                />

                <input
                    className="border p-3 rounded"
                    type="number"
                    placeholder="Year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                />

                <select
                    className="border p-3 rounded"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                >
                    <option value="">Select category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>

                <button className="bg-black text-white p-3 rounded">
                    Create Budget
                </button>
            </form>

            <div className="grid gap-4">
                {summary.map((item) => (
                    <div key={item.budgetId} className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-bold">{item.categoryName}</h2>
                        <p>Limit: ${item.monthlyLimit.toLocaleString()}</p>
                        <p>Spent: ${item.amountSpent.toLocaleString()}</p>
                        <p>Remaining: ${item.remaining.toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </main>
        </ProtectedRoute>
    );
}