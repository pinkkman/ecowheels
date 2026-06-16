"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
    return (
        <button
            onClick={() =>
                signOut({
                    callbackUrl: "/",
                    redirect:true
                })
            }
            className="
        px-6 py-3
        bg-red-700 hover:bg-red-800
        text-white font-bold
        rounded-xl
        border-2 border-red-800
        shadow-md
        transition
      "
        >
            Logout
        </button>
    );
}