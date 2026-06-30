"use client";

import { useEffect, useState } from "react";
import categoryService from "@/services/categoryService";
import { Category } from "@/types";
import AppLayout from "@/components/layout/AppLayout";
import CategoryForm from "@/components/categories/CategoryForm";
import CategoryList from "@/components/categories/CategoryList";

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadCategories() {
            const data = await categoryService.getMyCategories();
            setCategories(data);
            setLoading(false);
        }

        loadCategories();
    }, []);

    function handleCategoryCreated(category: Category) {
        setCategories([...categories, category]);
    }

    if (loading) {
        return <main className="p-8">Loading categories...</main>;
    }

    return (
        <AppLayout title="Categories">
            <CategoryForm onCategoryCreated={handleCategoryCreated} />
            <CategoryList categories={categories} />
        </AppLayout>
    );
}