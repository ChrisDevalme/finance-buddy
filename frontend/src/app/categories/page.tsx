"use client";

import AppLayout from "@/components/layout/AppLayout";
import CategoryForm from "@/components/categories/CategoryForm";
import CategoryList from "@/components/categories/CategoryList";
import { useCategories } from "@/hooks/useCategories";

export default function CategoriesPage() {
    const { categories, loading, error, createCategory } = useCategories();

    if (loading) return <main className="p-8">Loading categories...</main>;
    if (error) return <main className="p-8 text-red-600">{error}</main>;

    return (
        <AppLayout title="Categories">
            <CategoryForm onCategoryCreated={createCategory} />
            <CategoryList categories={categories} />
        </AppLayout>
    );
}