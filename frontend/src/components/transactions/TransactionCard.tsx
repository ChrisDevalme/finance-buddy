import { Transaction } from "@/types";
import {
    ArrowDownCircle,
    ArrowUpCircle,
    Pencil,
    Repeat,
    Trash2,
} from "lucide-react";

interface TransactionCardProps {
    transaction: Transaction;
    onEdit: (transaction: Transaction) => void;
    onDelete: () => void;
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

export default function TransactionCard({
                                            transaction,
                                            onEdit,
                                            onDelete,
                                        }: TransactionCardProps) {
    const Icon = getTransactionIcon(transaction.type);
    const isExpense = transaction.type === "EXPENSE";

    return (
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between gap-4">
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

                <div className="flex items-center gap-4">
                    <p
                        className={`text-lg font-bold ${
                            isExpense ? "text-red-600" : "text-green-600"
                        }`}
                    >
                        {isExpense ? "-" : "+"}${transaction.amount.toLocaleString()}
                    </p>

                    <button
                        type="button"
                        onClick={() => onEdit(transaction)}
                        className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200"
                    >
                        <Pencil size={18} />
                    </button>

                    <button
                        type="button"
                        onClick={onDelete}
                        className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}