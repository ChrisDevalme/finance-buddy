"use client";

import { useEffect, useState } from "react";
import categoryService from "@/services/categoryService";
import { Category } from "@/types";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [name, setName] = useState("");

    useEffect(() => {
        async function loadCategories() {
            const data = await categoryService.getMyCategories();
            setCategories(data);
        }

        loadCategories();
    }, []);

    async function handleCreateCategory(e: React.FormEvent) {
        e.preventDefault();

        const newCategory = await categoryService.createCategory({ name });

        setCategories([...categories, newCategory]);
        setName("");
    }

    return (
        <ProtectedRoute>
        <Navbar />
        <main className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-6">Categories</h1>

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

            <div className="grid gap-4">
                {categories.map((category) => (
                    <div key={category.id} className="bg-white p-4 rounded shadow">
                        {category.name}
                    </div>
                ))}
            </div>
        </main>
        </ProtectedRoute>
    );
}