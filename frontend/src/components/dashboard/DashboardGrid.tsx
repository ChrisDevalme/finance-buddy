import { DashboardSummary } from "@/types";
import DashboardCard from "./DashboardCard";

interface DashboardGridProps {
    summary: DashboardSummary;
}

export default function DashboardGrid({ summary }: DashboardGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <DashboardCard label="Total Balance" value={summary.totalBalance} />
            <DashboardCard label="Income" value={summary.totalIncome} />
            <DashboardCard label="Expenses" value={summary.totalExpenses} />
            <DashboardCard label="Net Cash Flow" value={summary.netCashFlow} />
        </div>
    );
}