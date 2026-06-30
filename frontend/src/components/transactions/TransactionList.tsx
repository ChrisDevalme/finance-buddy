"use client";

import { useState } from "react";
import { Transaction } from "@/types";
import TransactionCard from "./TransactionCard";
import ConfirmationModal from "@/components/ui/ConfirmationModal";

interface TransactionListProps {
    transactions: Transaction[];
    onEdit: (transaction: Transaction) => void;
    onDelete: (transactionId: number) => Promise<void>;
}

export default function TransactionList({
                                            transactions,
                                            onEdit,
                                            onDelete,
                                        }: TransactionListProps) {
    const [transactionToDelete, setTransactionToDelete] =
        useState<Transaction | null>(null);

    async function handleConfirmDelete() {
        if (!transactionToDelete) return;

        await onDelete(transactionToDelete.id);
        setTransactionToDelete(null);
    }

    if (transactions.length === 0) {
        return (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center">
                <p className="text-slate-500">
                    No transactions yet. Create your first transaction above.
                </p>
            </div>
        );
    }

    return (
        <>
            <div className="grid gap-4">
                {transactions.map((transaction) => (
                    <TransactionCard
                        key={transaction.id}
                        transaction={transaction}
                        onEdit={onEdit}
                        onDelete={() => setTransactionToDelete(transaction)}
                    />
                ))}
            </div>

            <ConfirmationModal
                open={transactionToDelete !== null}
                title="Delete Transaction"
                description="Are you sure you want to delete this transaction? This action cannot be undone."
                confirmText="Delete"
                onCancel={() => setTransactionToDelete(null)}
                onConfirm={handleConfirmDelete}
            />
        </>
    );
}