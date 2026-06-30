"use client";

import { useEffect, useState } from "react";
import accountService from "@/services/accountService";
import { Account } from "@/types";
import AppLayout from "@/components/layout/AppLayout";
import AccountForm from "@/components/accounts/AccountForm";
import AccountList from "@/components/accounts/AccountList";

export default function AccountsPage() {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadAccounts() {
            const data = await accountService.getMyAccounts();
            setAccounts(data);
            setLoading(false);
        }

        loadAccounts();
    }, []);

    function handleAccountCreated(account: Account) {
        setAccounts([...accounts, account]);
    }

    if (loading) {
        return <main className="p-8">Loading accounts...</main>;
    }

    return (

        <AppLayout title="Accounts">

                <AccountForm onAccountCreated={handleAccountCreated} />

                <AccountList accounts={accounts} />
        </AppLayout>
    );
}