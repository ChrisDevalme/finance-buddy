"use client";

import { useState } from "react";
import {
    Account,
    Category,
    Transaction,
    TransactionRequest,
} from "@/types";

interface TransactionFormProps {
    accounts: Account[];
    categories: Category[];
    onTransactionCreated: (
        transaction: TransactionRequest
    ) => Promise<Transaction>;
}

export default function TransactionForm({
                                            accounts,
                                            categories,
                                            onTransactionCreated,
                                        }: TransactionFormProps) {
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState<"INCOME" | "EXPENSE" | "TRANSFER">(
        "EXPENSE"
    );
    const [transactionDate, setTransactionDate] = useState("");
    const [accountId, setAccountId] = useState("");
    const [categoryId, setCategoryId] = useState("");

    async function handleCreateTransaction(e: React.FormEvent) {
        e.preventDefault();

        await onTransactionCreated({
            description,
            amount: Number(amount),
            type,
            transactionDate,
            accountId: Number(accountId),
            categoryId: Number(categoryId),
        });

        setDescription("");
        setAmount("");
        setType("EXPENSE");
        setTransactionDate("");
        setAccountId("");
        setCategoryId("");
    }

    return (
        <form
            onSubmit={handleCreateTransaction}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-6"
        >
            <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-900">Add Transaction</h2>
                <p className="text-sm text-slate-500 mt-1">
                    Track income, expenses, and transfers across your accounts.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                    className="border border-slate-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-slate-900"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <input
                    className="border border-slate-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-slate-900"
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />

                <select
                    className="border border-slate-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-slate-900"
                    value={type}
                    onChange={(e) =>
                        setType(e.target.value as "INCOME" | "EXPENSE" | "TRANSFER")
                    }
                >
                    <option value="EXPENSE">Expense</option>
                    <option value="INCOME">Income</option>
                    <option value="TRANSFER">Transfer</option>
                </select>

                <input
                    className="border border-slate-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-slate-900"
                    type="date"
                    value={transactionDate}
                    onChange={(e) => setTransactionDate(e.target.value)}
                />

                <select
                    className="border border-slate-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-slate-900"
                    value={accountId}
                    onChange={(e) => setAccountId(e.target.value)}
                >
                    <option value="">Select account</option>
                    {accounts.map((account) => (
                        <option key={account.id} value={account.id}>
                            {account.name}
                        </option>
                    ))}
                </select>

                <select
                    className="border border-slate-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-slate-900"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                >
                    <option value="">Select category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <button
                type="submit"
                className="mt-4 bg-slate-950 text-white px-6 py-3 rounded-xl hover:bg-slate-800 transition"
            >
                Create Transaction
            </button>
        </form>
    );
}