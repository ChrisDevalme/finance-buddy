"use client";

import AppLayout from "@/components/layout/AppLayout";
import TransactionForm from "@/components/transactions/TransactionForm";
import TransactionList from "@/components/transactions/TransactionList";
import { useTransactions } from "@/hooks/useTransactions";

export default function TransactionsPage() {
    const {
        transactions,
        accounts,
        categories,
        editingTransaction,
        setEditingTransaction,
        loading,
        error,
        createTransaction,
        updateTransaction,
        deleteTransaction,
    } = useTransactions();

    if (loading) return <main className="p-8">Loading transactions...</main>;
    if (error) return <main className="p-8 text-red-600">{error}</main>;

    return (
        <AppLayout title="Transactions">
            <TransactionForm
                accounts={accounts}
                categories={categories}
                editingTransaction={editingTransaction}
                onTransactionCreated={createTransaction}
                onTransactionUpdated={updateTransaction}
                onCancelEdit={() => setEditingTransaction(null)}
            />

            <TransactionList
                transactions={transactions}
                onEdit={setEditingTransaction}
                onDelete={deleteTransaction}
            />
        </AppLayout>
    );
}