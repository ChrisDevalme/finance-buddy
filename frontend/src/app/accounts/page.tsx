"use client";

import AppLayout from "@/components/layout/AppLayout";
import AccountForm from "@/components/accounts/AccountForm";
import AccountList from "@/components/accounts/AccountList";
import { useAccounts } from "@/hooks/useAccounts";

export default function AccountsPage() {
    const { accounts, loading, error, createAccount } = useAccounts();

    if (loading) {
        return <main className="p-8">Loading accounts...</main>;
    }

    if (error) {
        return <main className="p-8 text-red-600">{error}</main>;
    }

    return (
        <AppLayout title="Accounts">
            <AccountForm onAccountCreated={createAccount} />
            <AccountList accounts={accounts} />
        </AppLayout>
    );
}