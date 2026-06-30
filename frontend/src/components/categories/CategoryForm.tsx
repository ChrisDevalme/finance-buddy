"use client";

import { useState } from "react";
import { Category, CategoryRequest } from "@/types";

interface CategoryFormProps {
    onCategoryCreated: (category: CategoryRequest) => Promise<Category>;
}

export default function CategoryForm({ onCategoryCreated }: CategoryFormProps) {
    const [name, setName] = useState("");

    async function handleCreateCategory(e: React.FormEvent) {
        e.preventDefault();

        await onCategoryCreated({ name });

        setName("");
    }

    return (
        <form
            onSubmit={handleCreateCategory}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-6"
        >
            <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-900">Add Category</h2>
                <p className="text-sm text-slate-500 mt-1">
                    Create custom categories to organize your transactions and budgets.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                    className="border border-slate-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-slate-900 md:col-span-2"
                    placeholder="Category name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <button
                    type="submit"
                    className="bg-slate-950 text-white p-3 rounded-xl hover:bg-slate-800 transition"
                >
                    Create Category
                </button>
            </div>
        </form>
    );
}