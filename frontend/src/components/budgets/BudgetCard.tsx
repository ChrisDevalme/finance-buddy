import { BudgetSummary } from "@/types";

interface BudgetCardProps {
    item: BudgetSummary;
}

export default function BudgetCard({ item }: BudgetCardProps) {
    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold">{item.categoryName}</h2>
            <p>Limit: ${item.monthlyLimit.toLocaleString()}</p>
            <p>Spent: ${item.amountSpent.toLocaleString()}</p>
            <p>Remaining: ${item.remaining.toLocaleString()}</p>
        </div>
    );
}