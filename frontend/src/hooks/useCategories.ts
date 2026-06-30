import { useEffect, useState } from "react";
import categoryService from "@/services/categoryService";
import { Category, CategoryRequest } from "@/types";

export function useCategories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadCategories();
    }, []);

    async function loadCategories() {
        try {
            const data = await categoryService.getMyCategories();
            setCategories(data);
        } catch {
            setError("Unable to load categories.");
        } finally {
            setLoading(false);
        }
    }

    async function createCategory(request: CategoryRequest) {
        const newCategory = await categoryService.createCategory(request);
        setCategories((current) => [...current, newCategory]);
        return newCategory;
    }

    return {
        categories,
        loading,
        error,
        createCategory,
    };
}