"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { WalletCards } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function RegisterPage() {
    const router = useRouter();
    const { register } = useAuth();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        try {
            await register({
                firstName,
                lastName,
                email,
                password,
            });

            router.push("/dashboard");
        } catch {
            setError("Unable to create account. Try another email.");
        }
    }

    return (
        <main className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
            <section className="bg-white w-full max-w-md p-8 rounded-3xl shadow-sm border border-slate-200">
                <div className="flex items-center gap-3 mb-8">
                    <div className="bg-slate-950 text-white p-3 rounded-2xl">
                        <WalletCards size={26} />
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            Finance Buddy
                        </h1>
                        <p className="text-sm text-slate-500">
                            Create your account
                        </p>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="grid gap-4">
                    <input
                        className="border border-slate-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-slate-900"
                        placeholder="First name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />

                    <input
                        className="border border-slate-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-slate-900"
                        placeholder="Last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />

                    <input
                        className="border border-slate-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-slate-900"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        className="border border-slate-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-slate-900"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="bg-slate-950 text-white p-3 rounded-xl hover:bg-slate-800 transition"
                    >
                        Create Account
                    </button>
                </form>
            </section>
        </main>
    );
}