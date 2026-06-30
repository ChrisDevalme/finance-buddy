import api from "./api";
import {
    AuthResponse,
    LoginRequest,
    RegisterRequest
} from "@/types";

class AuthService {

    async register(request: RegisterRequest): Promise<AuthResponse> {

        const response = await api.post<AuthResponse>(
            "/api/auth/register",
            request
        );

        return response.data;
    }

    async login(request: LoginRequest): Promise<AuthResponse> {

        const response = await api.post<AuthResponse>(
            "/api/auth/login",
            request
        );

        return response.data;
    }

    logout() {
        localStorage.removeItem("token");
    }

    saveToken(token: string) {
        localStorage.setItem("token", token);
    }

    getToken() {
        return localStorage.getItem("token");
    }

    isAuthenticated() {
        return this.getToken() !== null;
    }

}

export default new AuthService();