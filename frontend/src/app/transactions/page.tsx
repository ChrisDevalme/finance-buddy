"use client";

import { useEffect, useState } from "react";
import transactionService from "@/services/transactionService";
import accountService from "@/services/accountService";
import categoryService from "@/services/categoryService";
import { Account, Category, Transaction } from "@/types";
import AppLayout from "@/components/layout/AppLayout";
import TransactionForm from "@/components/transactions/TransactionForm";
import TransactionList from "@/components/transactions/TransactionList";

export default function TransactionsPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

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
            setLoading(false);
        }

        loadData();
    }, []);

    function handleTransactionCreated(transaction: Transaction) {
        setTransactions([transaction, ...transactions]);
    }

    if (loading) {
        return <main className="p-8">Loading transactions...</main>;
    }

    return (
        <AppLayout title="Transactions">
            <TransactionForm
                accounts={accounts}
                categories={categories}
                onTransactionCreated={handleTransactionCreated}
            />

            <TransactionList transactions={transactions} />
        </AppLayout>
    );
}