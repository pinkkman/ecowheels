"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError("");
        setMessage("");

        if (!token) {
            setError("Invalid or missing reset link.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token,
                    password,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Password reset failed.");
                return;
            }

            setMessage("Password reset successfully! You can now log in.");

            setPassword("");
            setConfirmPassword("");
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-2xl">

                {/* Header */}
                <div className="mb-8 text-center">
                    <div className="mb-4 text-5xl">
                        🔐
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900">
                        Reset Password
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Create a new password for your EcoWheels account.
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                        {error}
                    </div>
                )}

                {/* Success */}
                {message && (
                    <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                        {message}
                    </div>
                )}

                {/* Reset Form */}
                {!message && (
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* New Password */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-800">
                                New Password
                            </label>

                            <input
                                type="password"
                                placeholder="Enter new password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                                className="w-full rounded-2xl border-2 border-gray-300 bg-white px-5 py-4 text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100"
                            />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-800">
                                Confirm Password
                            </label>

                            <input
                                type="password"
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                minLength={6}
                                className="w-full rounded-2xl border-2 border-gray-300 bg-white px-5 py-4 text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100"
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-2xl bg-gradient-to-r from-green-600 to-emerald-500 px-6 py-4 text-lg font-semibold text-white shadow-lg transition hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {loading ? "Resetting..." : "Reset Password"}
                        </button>

                    </form>
                )}

                {/* Success → Login */}
                {message && (
                    <Link
                        href="/login"
                        className="block w-full rounded-2xl bg-green-600 px-6 py-4 text-center text-lg font-semibold text-white transition hover:bg-green-700"
                    >
                        Go to Login
                    </Link>
                )}

                {/* Footer */}
                {!message && (
                    <p className="mt-8 text-center text-gray-600">
                        Remember your password?{" "}
                        <Link
                            href="/login"
                            className="font-semibold text-green-600 hover:text-green-700"
                        >
                            Login
                        </Link>
                    </p>
                )}

            </div>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50">
                    <div className="text-lg font-semibold text-gray-700">
                        Loading...
                    </div>
                </div>
            }
        >
            <ResetPasswordForm />
        </Suspense>
    );
}