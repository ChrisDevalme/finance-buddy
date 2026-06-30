import api from "./api";
import { Account, AccountRequest } from "@/types";

class AccountService {
    async getMyAccounts(): Promise<Account[]> {
        const response = await api.get<Account[]>("/api/accounts/me");
        return response.data;
    }

    async createAccount(request: AccountRequest): Promise<Account> {
        const response = await api.post<Account>("/api/accounts", request);
        return response.data;
    }

    async updateAccount(accountId: number, request: AccountRequest): Promise<Account> {
        const response = await api.put<Account>(`/api/accounts/${accountId}`, request);
        return response.data;
    }

    async deleteAccount(accountId: number): Promise<void> {
        await api.delete(`/api/accounts/${accountId}`);
    }
}

export default new AccountService();