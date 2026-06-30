"use client";

import { useState } from "react";
import { Budget, BudgetRequest, Category } from "@/types";

interface BudgetFormProps {
    categories: Category[];
    onBudgetCreated: (budget: BudgetRequest) => Promise<Budget>;
}

export default function BudgetForm({ categories, onBudgetCreated }: BudgetFormProps) {
    const [monthlyLimit, setMonthlyLimit] = useState("");
    const [month, setMonth] = useState("6");
    const [year, setYear] = useState("2026");
    const [categoryId, setCategoryId] = useState("");

    async function handleCreateBudget(e: React.FormEvent) {
        e.preventDefault();

        await onBudgetCreated({
            monthlyLimit: Number(monthlyLimit),
            month: Number(month),
            year: Number(year),
            categoryId: Number(categoryId),
        });

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

            <button type="submit" className="bg-black text-white p-3 rounded">
                Create Budget
            </button>
        </form>
    );
}