"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function AdminNavbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 bg-[#5B0000] shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">

                {/* Logo + Brand */}
                <Link
                    href="/"
                    className="flex items-center gap-3"
                >
                    <div className="overflow-hidden rounded-lg">
                        <Image
                            src="/logo.png"
                            alt="Eco Wheels Rourkela"
                            width={50}
                            height={50}
                            priority
                            className="object-cover scale-[1.8]"
                        />
                    </div>

                    <div className="leading-none">
                        <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                            ECO WHEELS
                        </h1>

                        <p className="text-[10px] sm:text-[11px] tracking-[3px] text-gray-200 mt-1">
                            ROURKELA
                        </p>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    <Link
                        href="/"
                        className="text-white font-semibold hover:text-yellow-300 transition"
                    >
                        Home
                    </Link>

                    {/*<Link*/}
                    {/*    href="/admin/suggest-changes"*/}
                    {/*    className="text-white font-semibold hover:text-yellow-300 transition"*/}
                    {/*>*/}
                    {/*    Suggest a change*/}
                    {/*</Link>*/}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-white"
                >
                    <div
                        className={`transition-transform duration-300 ${
                            isOpen ? "rotate-90" : "rotate-0"
                        }`}
                    >
                        {isOpen ? (
                            <X size={30} />
                        ) : (
                            <Menu size={30} />
                        )}
                    </div>
                </button>
            </div>

            {/* Mobile Dropdown */}
            <div
                className={`
md:hidden overflow-hidden transition-all duration-300 ease-in-out
${
                    isOpen
                        ? "max-h-60 opacity-100"
                        : "max-h-0 opacity-0"
                }
`}
            >
                <div className="bg-[#5B0000] border-t border-[#7A1C1C] px-6 py-4 space-y-4">

                    <Link
                        href="/"
                        onClick={() => setIsOpen(false)}
                        className="block text-white font-semibold hover:text-yellow-300 transition-all duration-200 hover:translate-x-2"
                    >
                        Home
                    </Link>

                    {/*<Link*/}
                    {/*    href="/admin/suggest-changes"*/}
                    {/*    onClick={() => setIsOpen(false)}*/}
                    {/*    className="block text-white font-semibold hover:text-yellow-300 transition-all duration-200 hover:translate-x-2"*/}
                    {/*>*/}
                    {/*    Suggest a change*/}
                    {/*</Link>*/}

                </div>
            </div>
        </nav>
    );
}
