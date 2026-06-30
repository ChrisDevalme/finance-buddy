import { Account } from "@/types";
import { CreditCard, Landmark, PiggyBank, Wallet } from "lucide-react";

interface AccountCardProps {
    account: Account;
}

function getAccountIcon(type: string) {
    switch (type) {
        case "CHECKING":
            return Wallet;
        case "SAVINGS":
            return PiggyBank;
        case "CREDIT_CARD":
            return CreditCard;
        case "INVESTMENT":
            return Landmark;
        default:
            return Wallet;
    }
}

export default function AccountCard({ account }: AccountCardProps) {
    const Icon = getAccountIcon(account.type);

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-6">
                <div className="bg-slate-100 p-3 rounded-xl">
                    <Icon size={24} className="text-slate-700" />
                </div>

                <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
          {account.type.replace("_", " ")}
        </span>
            </div>

            <h2 className="text-lg font-semibold text-slate-900">{account.name}</h2>

            <p className="text-3xl font-bold text-slate-950 mt-3">
                ${account.balance.toLocaleString()}
            </p>
        </div>
    );
}