"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

interface AppLayoutProps {
    title: string;
    children: React.ReactNode;
}

export default function AppLayout({ title, children }: AppLayoutProps) {
    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-slate-100 flex">
                <Sidebar />

                <div className="flex-1 min-w-0">
                    <Topbar title={title} />

                    <main className="p-6 md:p-8 max-w-7xl mx-auto">
                        {children}
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    );
}