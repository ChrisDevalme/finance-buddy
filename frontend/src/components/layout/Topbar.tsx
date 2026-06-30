"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

interface TopbarProps {
    title: string;
}

export default function Topbar({ title }: TopbarProps) {
    const router = useRouter();
    const { logout } = useAuth();

    function handleLogout() {
        logout();
        router.push("/login");
    }

    return (
        <header className="bg-white border-b px-8 py-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold">{title}</h2>

            <button
                onClick={handleLogout}
                className="bg-black text-white px-4 py-2 rounded"
            >
                Logout
            </button>
        </header>
    );
}