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
}

export default new TransactionService();