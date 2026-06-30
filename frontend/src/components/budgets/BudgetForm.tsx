"use client";

import { useState } from "react";
import { Budget, Category } from "@/types";
import budgetService from "@/services/budgetService";

interface BudgetFormProps {
    categories: Category[];
    onBudgetCreated: (budget: Budget) => void;
}

export default function BudgetForm({ categories, onBudgetCreated }: BudgetFormProps) {
    const [monthlyLimit, setMonthlyLimit] = useState("");
    const [month, setMonth] = useState("6");
    const [year, setYear] = useState("2026");
    const [categoryId, setCategoryId] = useState("");

    async function handleCreateBudget(e: React.FormEvent) {
        e.preventDefault();

        const newBudget = await budgetService.createBudget({
            monthlyLimit: Number(monthlyLimit),
            month: Number(month),
            year: Number(year),
            categoryId: Number(categoryId),
        });

        onBudgetCreated(newBudget);

        setMonthlyLimit("");
        setCategoryId("");
    }

    return (
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
    );
}