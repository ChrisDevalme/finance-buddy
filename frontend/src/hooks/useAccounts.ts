import { useEffect, useState } from "react";
import accountService from "@/services/accountService";
import { Account, AccountRequest } from "@/types";

export function useAccounts() {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadAccounts();
    }, []);

    async function loadAccounts() {
        try {
            const data = await accountService.getMyAccounts();
            setAccounts(data);
        } catch {
            setError("Unable to load accounts.");
        } finally {
            setLoading(false);
        }
    }

    async function createAccount(request: AccountRequest) {
        const newAccount = await accountService.createAccount(request);
        setAccounts((currentAccounts) => [...currentAccounts, newAccount]);
        return newAccount;
    }

    return {
        accounts,
        loading,
        error,
        createAccount,
    };
}