import { Category } from "@/types";
import CategoryCard from "./CategoryCard";

interface CategoryListProps {
    categories: Category[];
}

export default function CategoryList({ categories }: CategoryListProps) {
    return (
        <div className="grid gap-4">
            {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
            ))}
        </div>
    );
}