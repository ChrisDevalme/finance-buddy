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
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-6"
        >
            <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-900">Add Budget</h2>
                <p className="text-sm text-slate-500 mt-1">
                    Set monthly category limits and track your spending progress.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                    className="border border-slate-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-slate-900"
                    type="number"
                    placeholder="Monthly limit"
                    value={monthlyLimit}
                    onChange={(e) => setMonthlyLimit(e.target.value)}
                />

                <input
                    className="border border-slate-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-slate-900"
                    type="number"
                    placeholder="Month"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                />

                <input
                    className="border border-slate-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-slate-900"
                    type="number"
                    placeholder="Year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                />

                <select
                    className="border border-slate-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-slate-900"
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
            </div>

            <button
                type="submit"
                className="mt-4 bg-slate-950 text-white px-6 py-3 rounded-xl hover:bg-slate-800 transition"
            >
                Create Budget
            </button>
        </form>
    );
}