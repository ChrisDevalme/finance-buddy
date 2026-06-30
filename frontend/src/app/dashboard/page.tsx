"use client";

import { useEffect, useState } from "react";
import dashboardService from "@/services/dashboardService";
import DashboardGrid from "@/components/dashboard/DashboardGrid";
import { DashboardSummary } from "@/types";
import AppLayout from "@/components/layout/AppLayout";
import Navbar from "@/components/layout/Navbar";
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
        <AppLayout title="Dashboard">
            {summary && <DashboardGrid summary={summary} />}
        </AppLayout>
    );
}