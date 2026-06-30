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
            className="bg-white p-6 rounded-lg shadow mb-6 grid gap-4"
        >
            <h2 className="text-xl font-bold">Add Transaction</h2>

            <input
                className="border p-3 rounded"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <input
                className="border p-3 rounded"
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />

            <select
                className="border p-3 rounded"
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
                className="border p-3 rounded"
                type="date"
                value={transactionDate}
                onChange={(e) => setTransactionDate(e.target.value)}
            />

            <select
                className="border p-3 rounded"
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}
            >
                <option value="">Select Account</option>

                {accounts.map((account) => (
                    <option key={account.id} value={account.id}>
                        {account.name}
                    </option>
                ))}
            </select>

            <select
                className="border p-3 rounded"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
            >
                <option value="">Select Category</option>

                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>

            <button
                type="submit"
                className="bg-black text-white p-3 rounded hover:bg-gray-800 transition"
            >
                Create Transaction
            </button>
        </form>
    );
}