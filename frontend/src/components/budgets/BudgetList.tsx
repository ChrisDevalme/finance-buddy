import { BudgetSummary } from "@/types";
import BudgetCard from "./BudgetCard";

interface BudgetListProps {
    summary: BudgetSummary[];
}

export default function BudgetList({ summary }: BudgetListProps) {
    return (
        <div className="grid gap-4">
            {summary.map((item) => (
                <BudgetCard key={item.budgetId} item={item} />
            ))}
        </div>
    );
}