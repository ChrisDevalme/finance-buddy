import { Account } from "@/types";
import AccountCard from "./AccountCard";

interface AccountListProps {
    accounts: Account[];
}

export default function AccountList({ accounts }: AccountListProps) {
    if (accounts.length === 0) {
        return (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center">
                <p className="text-slate-500">No accounts yet. Create your first account above.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {accounts.map((account) => (
                <AccountCard key={account.id} account={account} />
            ))}
        </div>
    );
}