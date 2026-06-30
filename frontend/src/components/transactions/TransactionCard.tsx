import { Transaction } from "@/types";
import { ArrowDownCircle, ArrowUpCircle, Repeat } from "lucide-react";

interface TransactionCardProps {
    transaction: Transaction;
}

function getTransactionIcon(type: Transaction["type"]) {
    switch (type) {
        case "INCOME":
            return ArrowUpCircle;
        case "EXPENSE":
            return ArrowDownCircle;
        case "TRANSFER":
            return Repeat;
        default:
            return ArrowDownCircle;
    }
}

export default function TransactionCard({ transaction }: TransactionCardProps) {
    const Icon = getTransactionIcon(transaction.type);
    const isExpense = transaction.type === "EXPENSE";

    return (
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="bg-slate-100 p-3 rounded-xl">
                        <Icon size={22} className="text-slate-700" />
                    </div>

                    <div>
                        <h2 className="font-semibold text-slate-900">
                            {transaction.description}
                        </h2>

                        <p className="text-sm text-slate-500">
                            {transaction.transactionDate} · {transaction.type}
                        </p>
                    </div>
                </div>

                <p
                    className={`text-lg font-bold ${
                        isExpense ? "text-red-600" : "text-green-600"
                    }`}
                >
                    {isExpense ? "-" : "+"}${transaction.amount.toLocaleString()}
                </p>
            </div>
        </div>
    );
}