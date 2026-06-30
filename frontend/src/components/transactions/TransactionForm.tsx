"use client";

import { useEffect, useState } from "react";
import {
    Account,
    Category,
    Transaction,
    TransactionRequest,
} from "@/types";

interface TransactionFormProps {
    accounts: Account[];
    categories: Category[];
    editingTransaction: Transaction | null;
    onTransactionCreated: (transaction: TransactionRequest) => Promise<Transaction>;
    onTransactionUpdated: (
        transactionId: number,
        transaction: TransactionRequest
    ) => Promise<Transaction>;
    onCancelEdit: () => void;
}

export default function TransactionForm({
                                            accounts,
                                            categories,
                                            editingTransaction,
                                            onTransactionCreated,
                                            onTransactionUpdated,
                                            onCancelEdit,
                                        }: TransactionFormProps) {
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState<"INCOME" | "EXPENSE" | "TRANSFER">("EXPENSE");
    const [transactionDate, setTransactionDate] = useState("");
    const [accountId, setAccountId] = useState("");
    const [categoryId, setCategoryId] = useState("");

    useEffect(() => {
        if (editingTransaction) {
            setDescription(editingTransaction.description);
            setAmount(String(editingTransaction.amount));
            setType(editingTransaction.type);
            setTransactionDate(editingTransaction.transactionDate);
            setAccountId(String(editingTransaction.accountId));
            setCategoryId(String(editingTransaction.categoryId));
        }
    }, [editingTransaction]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const request: TransactionRequest = {
            description,
            amount: Number(amount),
            type,
            transactionDate,
            accountId: Number(accountId),
            categoryId: Number(categoryId),
        };

        if (editingTransaction) {
            await onTransactionUpdated(editingTransaction.id, request);
        } else {
            await onTransactionCreated(request);
        }

        setDescription("");
        setAmount("");
        setType("EXPENSE");
        setTransactionDate("");
        setAccountId("");
        setCategoryId("");
    }

    function handleCancel() {
        onCancelEdit();

        setDescription("");
        setAmount("");
        setType("EXPENSE");
        setTransactionDate("");
        setAccountId("");
        setCategoryId("");
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-6"
        >
            <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-900">
                    {editingTransaction ? "Edit Transaction" : "Add Transaction"}
                </h2>
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

            <div className="flex gap-3 mt-4">
                <button
                    type="submit"
                    className="bg-slate-950 text-white px-6 py-3 rounded-xl hover:bg-slate-800 transition"
                >
                    {editingTransaction ? "Update Transaction" : "Create Transaction"}
                </button>

                {editingTransaction && (
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="bg-slate-100 text-slate-700 px-6 py-3 rounded-xl hover:bg-slate-200 transition"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}