import api from "./api";
import { Transaction, TransactionRequest } from "@/types";

class TransactionService {
    async getMyTransactions(): Promise<Transaction[]> {
        const response = await api.get<Transaction[]>("/api/transactions/me");
        return response.data;
    }

    async createTransaction(request: TransactionRequest): Promise<Transaction> {
        const response = await api.post<Transaction>("/api/transactions", request);
        return response.data;
    }

    async updateTransaction(
        transactionId: number,
        request: TransactionRequest
    ): Promise<Transaction> {
        const response = await api.put<Transaction>(
            `/api/transactions/${transactionId}`,
            request
        );

        return response.data;
    }

    async deleteTransaction(transactionId: number): Promise<void> {
        await api.delete(`/api/transactions/${transactionId}`);
    }
}

export default new TransactionService();