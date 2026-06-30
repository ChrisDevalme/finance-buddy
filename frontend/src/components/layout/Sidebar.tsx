"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Accounts", href: "/accounts" },
    { label: "Transactions", href: "/transactions" },
    { label: "Budgets", href: "/budgets" },
    { label: "Categories", href: "/categories" },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="hidden md:flex w-64 min-h-screen bg-white border-r p-6 flex-col">
            <h1 className="text-2xl font-bold mb-8">Finance Buddy</h1>

            <nav className="flex flex-col gap-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`px-4 py-3 rounded-lg ${
                                isActive
                                    ? "bg-black text-white"
                                    : "text-gray-700 hover:bg-gray-100"
                            }`}
                        >
                            {item.label}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}