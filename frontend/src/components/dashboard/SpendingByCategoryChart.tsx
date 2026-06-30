"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { CategorySpending } from "@/types";

interface SpendingByCategoryChartProps {
    data: CategorySpending[];
}

export default function SpendingByCategoryChart({
                                                    data,
                                                }: SpendingByCategoryChartProps) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mt-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
                Spending by Category
            </h2>

            {data.length === 0 ? (
                <p className="text-slate-500">No spending data for this month yet.</p>
            ) : (
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <XAxis dataKey="categoryName" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="totalSpent" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}