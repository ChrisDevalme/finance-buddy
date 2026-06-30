import { Category } from "@/types";
import { Tag } from "lucide-react";

interface CategoryCardProps {
    category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
    return (
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
            <div className="bg-slate-100 p-3 rounded-xl">
                <Tag size={22} className="text-slate-700" />
            </div>

            <div>
                <h2 className="font-semibold text-slate-900">{category.name}</h2>
                <p className="text-sm text-slate-500">Custom category</p>
            </div>
        </div>
    );
}