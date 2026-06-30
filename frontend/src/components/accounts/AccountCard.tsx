import { Account } from "@/types";

interface AccountCardProps {
    account: Account;
}

export default function AccountCard({ account }: AccountCardProps) {
    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold">{account.name}</h2>
            <p className="text-gray-500">{account.type}</p>
            <p className="text-2xl font-bold mt-2">
                ${account.balance.toLocaleString()}
            </p>
        </div>
    );
}