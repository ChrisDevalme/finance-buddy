import { Category } from "@/types";
import CategoryCard from "./CategoryCard";

interface CategoryListProps {
    categories: Category[];
}

export default function CategoryList({ categories }: CategoryListProps) {
    if (categories.length === 0) {
        return (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center">
                <p className="text-slate-500">
                    No categories yet. Create your first category above.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
            ))}
        </div>
    );
}