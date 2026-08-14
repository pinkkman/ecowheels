"use client";

import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);
        setMessage("");
        setError("");

        try {
            const res = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Something went wrong.");
                return;
            }

            setMessage(
                "If an account exists with this email, a reset link has been sent."
            );
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-2xl">

                <div className="mb-8 text-center">
                    <div className="mb-4 text-5xl">🔐</div>

                    <h1 className="text-3xl font-bold text-gray-900">
                        Forgot Password?
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Enter your email and we&apos;ll send you a reset link.
                    </p>
                </div>

                {error && (
                    <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                        {error}
                    </div>
                )}

                {message && (
                    <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-800">
                            Email Address
                        </label>

                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full rounded-2xl border-2 border-gray-300 bg-white px-5 py-4 text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-2xl bg-gradient-to-r from-green-600 to-emerald-500 px-6 py-4 text-lg font-semibold text-white shadow-lg transition hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>

                </form>

                <p className="mt-8 text-center text-gray-600">
                    Remember your password?{" "}
                    <Link
                        href="/login"
                        className="font-semibold text-green-600 hover:text-green-700"
                    >
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
}