"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Wallet,
    Receipt,
    PiggyBank,
    Tags,
} from "lucide-react";

const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Accounts", href: "/accounts", icon: Wallet },
    { label: "Transactions", href: "/transactions", icon: Receipt },
    { label: "Budgets", href: "/budgets", icon: PiggyBank },
    { label: "Categories", href: "/categories", icon: Tags },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="hidden md:flex w-72 min-h-screen bg-slate-950 text-white p-6 flex-col">
            <div className="mb-10">
                <h1 className="text-2xl font-bold">Finance Buddy</h1>
                <p className="text-sm text-slate-400 mt-1">Financial Management</p>
            </div>

            <nav className="flex flex-col gap-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                                isActive
                                    ? "bg-white text-slate-950"
                                    : "text-slate-300 hover:bg-slate-800"
                            }`}
                        >
                            <Icon size={20} />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto bg-slate-900 p-4 rounded-xl">
                <p className="text-sm text-slate-400">Logged in</p>
                <p className="font-semibold">Finance User</p>
            </div>
        </aside>
    );
}