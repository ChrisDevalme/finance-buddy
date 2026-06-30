"use client";

import { useState } from "react";
import { Category } from "@/types";
import categoryService from "@/services/categoryService";

interface CategoryFormProps {
    onCategoryCreated: (category: Category) => void;
}

export default function CategoryForm({ onCategoryCreated }: CategoryFormProps) {
    const [name, setName] = useState("");

    async function handleCreateCategory(e: React.FormEvent) {
        e.preventDefault();

        const newCategory = await categoryService.createCategory({ name });

        onCategoryCreated(newCategory);
        setName("");
    }

    return (
        <form
            onSubmit={handleCreateCategory}
            className="bg-white p-6 rounded-lg shadow mb-6 grid gap-4"
        >
            <h2 className="text-xl font-bold">Add Category</h2>

            <input
                className="border p-3 rounded"
                placeholder="Category name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <button className="bg-black text-white p-3 rounded">
                Create Category
            </button>
        </form>
    );
}