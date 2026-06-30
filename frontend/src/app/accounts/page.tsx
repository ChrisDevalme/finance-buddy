"use client";

import { useEffect, useState } from "react";
import accountService from "@/services/accountService";
import { Account } from "@/types";

export default function AccountsPage() {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");
    const [type, setType] = useState("CHECKING");
    const [balance, setBalance] = useState("");

    useEffect(() => {
        async function loadAccounts() {
            const data = await accountService.getMyAccounts();
            setAccounts(data);
            setLoading(false);
        }

        loadAccounts();
    }, []);

    if (loading) {
        return <main className="p-8">Loading accounts...</main>;
    }

    async function handleCreateAccount(e: React.FormEvent) {
        e.preventDefault();

        const newAccount = await accountService.createAccount({
            name,
            type,
            balance: Number(balance),
        });

        setAccounts([...accounts, newAccount]);

        setName("");
        setType("CHECKING");
        setBalance("");
    }

    return (
        <main className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-6">Accounts</h1>
            <form
                onSubmit={handleCreateAccount}
                className="bg-white p-6 rounded-lg shadow mb-6 grid gap-4"
            >
                <h2 className="text-xl font-bold">Add Account</h2>

                <input
                    className="border p-3 rounded"
                    placeholder="Account name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <select
                    className="border p-3 rounded"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value="CHECKING">Checking</option>
                    <option value="SAVINGS">Savings</option>
                    <option value="CREDIT_CARD">Credit Card</option>
                    <option value="INVESTMENT">Investment</option>
                </select>

                <input
                    className="border p-3 rounded"
                    placeholder="Balance"
                    type="number"
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                />

                <button className="bg-black text-white p-3 rounded">
                    Create Account
                </button>
            </form>
            <div className="grid gap-4">
                {accounts.map((account) => (
                    <div key={account.id} className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-bold">{account.name}</h2>
                        <p className="text-gray-500">{account.type}</p>
                        <p className="text-2xl font-bold mt-2">
                            ${account.balance.toLocaleString()}
                        </p>
                    </div>
                ))}
            </div>
        </main>
    );
}