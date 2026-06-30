"use client";

import { useState } from "react";
import { Account } from "@/types";
import accountService from "@/services/accountService";

interface AccountFormProps {
    onAccountCreated: (account: Account) => void;
}

export default function AccountForm({ onAccountCreated }: AccountFormProps) {
    const [name, setName] = useState("");
    const [type, setType] = useState("CHECKING");
    const [balance, setBalance] = useState("");

    async function handleCreateAccount(e: React.FormEvent) {
        e.preventDefault();

        const newAccount = await accountService.createAccount({
            name,
            type,
            balance: Number(balance),
        });

        onAccountCreated(newAccount);

        setName("");
        setType("CHECKING");
        setBalance("");
    }

    return (
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
    );
}