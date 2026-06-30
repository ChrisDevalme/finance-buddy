import { BudgetSummary } from "@/types";
import { AlertCircle, CheckCircle } from "lucide-react";

interface BudgetCardProps {
    item: BudgetSummary;
}

export default function BudgetCard({ item }: BudgetCardProps) {
    const isOverBudget = item.remaining < 0;
    const progress = Math.min(
        (item.amountSpent / item.monthlyLimit) * 100,
        100
    );

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">
                        {item.categoryName}
                    </h2>
                    <p className="text-sm text-slate-500">
                        {item.month}/{item.year}
                    </p>
                </div>

                {isOverBudget ? (
                    <AlertCircle className="text-red-600" />
                ) : (
                    <CheckCircle className="text-green-600" />
                )}
            </div>

            <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-500">Spent</span>
                    <span className="font-semibold">
            ${item.amountSpent.toLocaleString()} / $
                        {item.monthlyLimit.toLocaleString()}
          </span>
                </div>

                <div className="w-full bg-slate-100 rounded-full h-3">
                    <div
                        className={`h-3 rounded-full ${
                            isOverBudget ? "bg-red-600" : "bg-slate-950"
                        }`}
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            <p
                className={`font-bold ${
                    isOverBudget ? "text-red-600" : "text-green-600"
                }`}
            >
                {isOverBudget
                    ? `$${Math.abs(item.remaining).toLocaleString()} over budget`
                    : `$${item.remaining.toLocaleString()} remaining`}
            </p>
        </div>
    );
}