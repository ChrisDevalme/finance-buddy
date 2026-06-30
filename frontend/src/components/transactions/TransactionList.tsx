import { Transaction } from "@/types";
import TransactionCard from "./TransactionCard";

interface TransactionListProps {
    transactions: Transaction[];
}

export default function TransactionList({ transactions }: TransactionListProps) {
    if (transactions.length === 0) {
        return (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center">
                <p className="text-slate-500">
                    No transactions yet. Create your first transaction above.
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-4">
            {transactions.map((transaction) => (
                <TransactionCard key={transaction.id} transaction={transaction} />
            ))}
        </div>
    );
}