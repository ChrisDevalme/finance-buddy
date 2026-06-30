import { BudgetSummary } from "@/types";
import { AlertTriangle, CheckCircle } from "lucide-react";

interface BudgetAlertsProps {
    budgets: BudgetSummary[];
}

export default function BudgetAlerts({ budgets }: BudgetAlertsProps) {
    const overBudget = budgets.filter((budget) => budget.remaining < 0);
    const nearLimit = budgets.filter((budget) => {
        const percentUsed = budget.amountSpent / budget.monthlyLimit;
        return percentUsed >= 0.8 && budget.remaining >= 0;
    });

    return (
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mt-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
                Budget Alerts
            </h2>

            {overBudget.length === 0 && nearLimit.length === 0 ? (
                <div className="flex items-center gap-3 text-green-700 bg-green-50 p-4 rounded-xl">
                    <CheckCircle size={22} />
                    <p>You are within budget across all categories.</p>
                </div>
            ) : (
                <div className="grid gap-3">
                    {overBudget.map((budget) => (
                        <div
                            key={budget.budgetId}
                            className="flex items-center gap-3 text-red-700 bg-red-50 p-4 rounded-xl"
                        >
                            <AlertTriangle size={22} />
                            <p>
                                {budget.categoryName} is $
                                {Math.abs(budget.remaining).toLocaleString()} over budget.
                            </p>
                        </div>
                    ))}

                    {nearLimit.map((budget) => (
                        <div
                            key={budget.budgetId}
                            className="flex items-center gap-3 text-yellow-700 bg-yellow-50 p-4 rounded-xl"
                        >
                            <AlertTriangle size={22} />
                            <p>
                                {budget.categoryName} is close to its limit. $
                                {budget.remaining.toLocaleString()} remaining.
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}