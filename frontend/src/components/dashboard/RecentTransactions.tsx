import { Transaction } from "@/types";
import TransactionCard from "@/components/transactions/TransactionCard";

interface RecentTransactionsProps {
    transactions: Transaction[];
}

export default function RecentTransactions({ transactions }: RecentTransactionsProps) {
    return (
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mt-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
                Recent Transactions
            </h2>

            {transactions.length === 0 ? (
                <p className="text-slate-500">No recent transactions yet.</p>
            ) : (
                <div className="grid gap-4">
                    {transactions.map((transaction) => (
                        <TransactionCard key={transaction.id} transaction={transaction} />
                    ))}
                </div>
            )}
        </section>
    );
}