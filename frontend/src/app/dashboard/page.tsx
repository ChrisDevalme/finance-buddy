"use client";

import { useEffect, useState } from "react";
import dashboardService from "@/services/dashboardService";
import DashboardCard from "@/components/DashboardCard";
import { DashboardSummary } from "@/types";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function DashboardPage() {
    const [summary, setSummary] = useState<DashboardSummary | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        async function loadDashboard() {
            try {
                const data = await dashboardService.getSummary();
                setSummary(data);
            } catch {
                setError("Unable to load dashboard.");
            } finally {
                setLoading(false);
            }
        }

        loadDashboard();
    }, []);

    if (loading) {
        return (
            <main className="min-h-screen bg-gray-100 p-8">
                <p>Loading dashboard...</p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-screen bg-gray-100 p-8">
                <p className="text-red-600">{error}</p>
            </main>
        );
    }

    return (
        <ProtectedRoute>
            <Navbar />
        <main className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <DashboardCard label="Total Balance" value={summary?.totalBalance ?? 0} />
                <DashboardCard label="Income" value={summary?.totalIncome ?? 0} />
                <DashboardCard label="Expenses" value={summary?.totalExpenses ?? 0} />
                <DashboardCard label="Net Cash Flow" value={summary?.netCashFlow ?? 0} />
            </div>
        </main>
        </ProtectedRoute>
    );
}