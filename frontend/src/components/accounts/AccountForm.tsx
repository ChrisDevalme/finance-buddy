"use client";

import { useState } from "react";
import { Account, AccountRequest } from "@/types";

interface AccountFormProps {
    onAccountCreated: (account: AccountRequest) => Promise<Account>;
}

export default function AccountForm({ onAccountCreated }: AccountFormProps) {
    const [name, setName] = useState("");
    const [type, setType] = useState("CHECKING");
    const [balance, setBalance] = useState("");

    async function handleCreateAccount(e: React.FormEvent) {
        e.preventDefault();

        await onAccountCreated({
            name,
            type,
            balance: Number(balance),
        });

        setName("");
        setType("CHECKING");
        setBalance("");
    }

    return (
        <form
            onSubmit={handleCreateAccount}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-6"
        >
            <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-900">Add Account</h2>
                <p className="text-sm text-slate-500 mt-1">
                    Track checking, savings, credit cards, and investments.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                    className="border border-slate-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-slate-900"
                    placeholder="Account name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <select
                    className="border border-slate-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-slate-900"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value="CHECKING">Checking</option>
                    <option value="SAVINGS">Savings</option>
                    <option value="CREDIT_CARD">Credit Card</option>
                    <option value="INVESTMENT">Investment</option>
                </select>

                <input
                    className="border border-slate-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-slate-900"
                    placeholder="Balance"
                    type="number"
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                />

                <button
                    type="submit"
                    className="bg-slate-950 text-white p-3 rounded-xl hover:bg-slate-800 transition"
                >
                    Create Account
                </button>
            </div>
        </form>
    );
}