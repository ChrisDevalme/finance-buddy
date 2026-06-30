"use client";

import { createContext, useContext, useEffect, useState } from "react";
import authService from "@/services/authService";
import { AuthResponse, LoginRequest, RegisterRequest } from "@/types";

interface AuthContextType {
    user: AuthResponse | null;
    loading: boolean;
    login: (request: LoginRequest) => Promise<void>;
    register: (request: RegisterRequest) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<AuthResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = authService.getToken();

        if (token) {
            setUser({
                userId: 0,
                email: "",
                token: token,
            });
        }

        setLoading(false);
    }, []);

    async function login(request: LoginRequest) {
        const response = await authService.login(request);
        authService.saveToken(response.token);
        setUser(response);
    }

    async function register(request: RegisterRequest) {
        const response = await authService.register(request);
        authService.saveToken(response.token);
        setUser(response);
    }

    function logout() {
        authService.logout();
        setUser(null);
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,
                logout,
                isAuthenticated: user !== null,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context;
}