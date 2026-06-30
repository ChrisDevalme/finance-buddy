import { Account } from "@/types";
import AccountCard from "./AccountCard";

interface AccountListProps {
    accounts: Account[];
}

export default function AccountList({ accounts }: AccountListProps) {
    return (
        <div className="grid gap-4">
            {accounts.map((account) => (
                <AccountCard key={account.id} account={account} />
            ))}
        </div>
    );
}