"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { MonthlySummary } from "@/types";

interface MonthlySummaryChartProps {
    data: MonthlySummary | null;
}

export default function MonthlySummaryChart({ data }: MonthlySummaryChartProps) {
    const chartData = data
        ? [
            { name: "Income", amount: data.totalIncome },
            { name: "Expenses", amount: data.totalExpenses },
            { name: "Net Cash Flow", amount: data.netCashFlow },
        ]
        : [];

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mt-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
                Monthly Summary
            </h2>

            {chartData.length === 0 ? (
                <p className="text-slate-500">No monthly summary data available.</p>
            ) : (
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="amount" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}