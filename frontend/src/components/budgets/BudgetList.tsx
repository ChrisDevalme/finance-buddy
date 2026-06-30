import { BudgetSummary } from "@/types";
import BudgetCard from "./BudgetCard";

interface BudgetListProps {
    summary: BudgetSummary[];
}

export default function BudgetList({ summary }: BudgetListProps) {
    if (summary.length === 0) {
        return (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center">
                <p className="text-slate-500">
                    No budgets yet. Create your first budget above.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {summary.map((item) => (
                <BudgetCard key={item.budgetId} item={item} />
            ))}
        </div>
    );
}