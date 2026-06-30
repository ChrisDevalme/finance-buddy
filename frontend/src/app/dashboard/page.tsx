"use client";

import AppLayout from "@/components/layout/AppLayout";
import DashboardGrid from "@/components/dashboard/DashboardGrid";
import { useDashboard } from "@/hooks/useDashboard";

export default function DashboardPage() {
    const { summary, loading, error } = useDashboard();

    if (loading) return <main className="p-8">Loading dashboard...</main>;
    if (error) return <main className="p-8 text-red-600">{error}</main>;

    return (
        <AppLayout title="Dashboard">
            {summary && <DashboardGrid summary={summary} />}
        </AppLayout>
    );
}