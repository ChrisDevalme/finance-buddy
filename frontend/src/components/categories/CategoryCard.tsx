import { Category } from "@/types";

interface CategoryCardProps {
    category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
    return (
        <div className="bg-white p-4 rounded shadow">
            {category.name}
        </div>
    );
}