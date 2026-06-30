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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadData();
    }, []);

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

    async function createTransaction(request: TransactionRequest) {
        const newTransaction = await transactionService.createTransaction(request);
        setTransactions((current) => [newTransaction, ...current]);
        return newTransaction;
    }

    return {
        transactions,
        accounts,
        categories,
        loading,
        error,
        createTransaction,
    };
}