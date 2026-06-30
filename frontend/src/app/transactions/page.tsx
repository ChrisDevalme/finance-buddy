"use client";

import { useEffect, useState } from "react";
import transactionService from "@/services/transactionService";
import accountService from "@/services/accountService";
import categoryService from "@/services/categoryService";
import { Account, Category, Transaction } from "@/types";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function TransactionsPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState<"INCOME" | "EXPENSE" | "TRANSFER">("EXPENSE");
    const [transactionDate, setTransactionDate] = useState("");
    const [accountId, setAccountId] = useState("");
    const [categoryId, setCategoryId] = useState("");

    useEffect(() => {
        async function loadData() {
            const [transactionData, accountData, categoryData] = await Promise.all([
                transactionService.getMyTransactions(),
                accountService.getMyAccounts(),
                categoryService.getMyCategories(),
            ]);

            setTransactions(transactionData);
            setAccounts(accountData);
            setCategories(categoryData);
        }

        loadData();
    }, []);

    async function handleCreateTransaction(e: React.FormEvent) {
        e.preventDefault();

        const newTransaction = await transactionService.createTransaction({
            description,
            amount: Number(amount),
            type,
            transactionDate,
            accountId: Number(accountId),
            categoryId: Number(categoryId),
        });

        setTransactions([newTransaction, ...transactions]);

        setDescription("");
        setAmount("");
        setType("EXPENSE");
        setTransactionDate("");
        setAccountId("");
        setCategoryId("");
    }

    return (
        <ProtectedRoute>
            <Navbar />
        <main className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-6">Transactions</h1>

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
                    <option value="">Select account</option>
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
                    <option value="">Select category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>

                <button className="bg-black text-white p-3 rounded">
                    Create Transaction
                </button>
            </form>

            <div className="grid gap-4">
                {transactions.map((transaction) => (
                    <div key={transaction.id} className="bg-white p-4 rounded shadow">
                        <div className="flex justify-between">
                            <div>
                                <h2 className="font-bold">{transaction.description}</h2>
                                <p className="text-gray-500">{transaction.transactionDate}</p>
                            </div>

                            <p className="font-bold">
                                {transaction.type === "EXPENSE" ? "-" : "+"}$
                                {transaction.amount.toLocaleString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </main>
        </ProtectedRoute>
    );
}