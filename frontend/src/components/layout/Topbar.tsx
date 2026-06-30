"use client";

import { Bell, Search, UserCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

interface TopbarProps {
    title: string;
}

export default function Topbar({ title }: TopbarProps) {
    const router = useRouter();
    const { logout, user } = useAuth();

    function handleLogout() {
        logout();
        router.push("/login");
    }

    return (
        <header className="bg-white border-b px-8 py-4 flex justify-between items-center">
            <div>
                <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
                <p className="text-sm text-slate-500">
                    Welcome back{user?.email ? `, ${user.email}` : ""}
                </p>
            </div>

            <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl">
                    <Search size={18} className="text-slate-500" />
                    <input
                        className="bg-transparent outline-none text-sm"
                        placeholder="Search..."
                    />
                </div>

                <button className="p-2 rounded-xl bg-slate-100">
                    <Bell size={20} />
                </button>

                <UserCircle size={32} className="text-slate-700" />

                <button
                    onClick={handleLogout}
                    className="bg-slate-950 text-white px-4 py-2 rounded-xl"
                >
                    Logout
                </button>
            </div>
        </header>
    );
}