
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const normalizePhone = (value: string) => {
    let p = value.replace(/\D/g, "");

    if (p.startsWith("91") && p.length === 12) {
      p = p.slice(2);
    }

    return p;
  };

  const handleSignup = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setError("");

    const formattedPhone = normalizePhone(phone);

    if (formattedPhone.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
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
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone: formattedPhone,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(
          data.message || "Signup failed."
        );
        setLoading(false);
        return;
      }

      router.push("/login?registered=true");
    } catch {
      setError(
        "Something went wrong. Please try again."
      );
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 text-5xl">
            ⚡
          </div>

          <h1 className="text-4xl font-bold text-gray-900">
            Join EcoWheels
          </h1>

          <p className="mt-2 text-gray-600">
            Create your account to get started
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSignup}
          className="space-y-6"
        >
          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-800">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
              className="w-full rounded-2xl border-2 border-gray-300 bg-white px-5 py-4 text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100"
            />
          </div>

          {/* Mobile */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-800">
              Mobile Number
            </label>

            <input
              type="tel"
              placeholder="9876543210"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              required
              className="w-full rounded-2xl border-2 border-gray-300 bg-white px-5 py-4 text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-800">
              Password
            </label>

            <div className="relative">
              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Create a password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
                className="w-full rounded-2xl border-2 border-gray-300 bg-white px-5 py-4 pr-20 text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-5 top-1/2 -translate-y-1/2 font-medium text-green-600 hover:text-green-700"
              >
                {showPassword
                  ? "Hide"
                  : "Show"}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-800">
              Confirm Password
            </label>

            <div className="relative">
              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                required
                className="w-full rounded-2xl border-2 border-gray-300 bg-white px-5 py-4 pr-20 text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                className="absolute right-5 top-1/2 -translate-y-1/2 font-medium text-green-600 hover:text-green-700"
              >
                {showConfirmPassword
                  ? "Hide"
                  : "Show"}
              </button>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-gradient-to-r from-green-600 to-emerald-500 px-6 py-4 text-lg font-semibold text-white shadow-lg transition hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-gray-600">
          Already have an account?{" "}
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

