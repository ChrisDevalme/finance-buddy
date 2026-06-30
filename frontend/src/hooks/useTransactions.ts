import { useEffect, useState } from "react";
import transactionService from "@/services/transactionService";
import accountService from "@/services/accountService";
import categoryService from "@/services/categoryService";
import {
    Account,
    Category,
    Transaction,
    TransactionRequest,
} from "@/types";

export function useTransactions() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [editingTransaction, setEditingTransaction] =
        useState<Transaction | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadData() {
            try {
                const [transactionData, accountData, categoryData] = await Promise.all([
                    transactionService.getMyTransactions(),
                    accountService.getMyAccounts(),
                    categoryService.getMyCategories(),
                ]);

                setTransactions(transactionData);
                setAccounts(accountData);
                setCategories(categoryData);
            } catch {
                setError("Unable to load transactions.");
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, []);

    async function createTransaction(request: TransactionRequest) {
        const newTransaction = await transactionService.createTransaction(request);
        setTransactions((current) => [newTransaction, ...current]);
        return newTransaction;
    }

    async function updateTransaction(
        transactionId: number,
        request: TransactionRequest
    ) {
        const updatedTransaction = await transactionService.updateTransaction(
            transactionId,
            request
        );

        setTransactions((current) =>
            current.map((transaction) =>
                transaction.id === transactionId ? updatedTransaction : transaction
            )
        );

        setEditingTransaction(null);

        return updatedTransaction;
    }

    async function deleteTransaction(transactionId: number) {
        await transactionService.deleteTransaction(transactionId);

        setTransactions((current) =>
            current.filter((transaction) => transaction.id !== transactionId)
        );
    }

    return {
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
    };
}