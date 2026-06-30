"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
    const router = useRouter();
    const { logout } = useAuth();

    function handleLogout() {
        logout();
        router.push("/login");
    }

    return (
        <nav className="bg-white border-b px-8 py-4 flex justify-between items-center">
            <Link href="/dashboard" className="font-bold text-xl">
                Finance Buddy
            </Link>

            <div className="flex gap-4 items-center">
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/accounts">Accounts</Link>
                <Link href="/transactions">Transactions</Link>
                <Link href="/budgets">Budgets</Link>
                <Link href="/categories">Categories</Link>

                <button
                    onClick={handleLogout}
                    className="bg-black text-white px-4 py-2 rounded"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}