import { Transaction } from "@/types";

interface TransactionCardProps {
    transaction: Transaction;
}

export default function TransactionCard({ transaction }: TransactionCardProps) {
    return (
        <div className="bg-white p-4 rounded shadow">
            <div className="flex justify-between">
                <div>
                    <h2 className="font-bold">{transaction.description}</h2>
                    <p className="text-gray-500">{transaction.transactionDate}</p>
                </div>

                <p className="font-bold">
                    {transaction.type === "EXPENSE" ? "-" : "+"}$
                    {transaction.amount.toLocaleString()}
                </p>
            </div>
        </div>
    );
}