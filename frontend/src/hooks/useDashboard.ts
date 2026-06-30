import { useEffect, useState } from "react";
import dashboardService from "@/services/dashboardService";
import { DashboardSummary } from "@/types";

export function useDashboard() {
    const [summary, setSummary] = useState<DashboardSummary | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadDashboard();
    }, []);

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

    return {
        summary,
        loading,
        error,
    };
}