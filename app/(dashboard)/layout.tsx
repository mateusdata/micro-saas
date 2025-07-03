"use client";
import { useAuth } from "@/contexts/AuthProvider";
import Link from "next/link";
import { ReactNode } from "react";
import { handleLogout } from "../lib/handleLogout";
import { LogOut } from "lucide-react";
import ModeToggle from "@/components/mode-toggle";

export default function Layout({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  return (
    <div>
      <header className="p-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Micro SaaS</h1>
        <div className="flex font-semibold gap-4 justify-center cursor-pointer items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-lg hover:text-gray-600">
              Home
            </Link>
            {user ? (
              <>
                <Link href="/dashboard" className="text-lg hover:text-gray-600">
                  Dashboard
                </Link>
                <button
                  className="text-lg flex items-center gap-1 transition-colors hover:text-red-400 hover:shadow-2xl"
                  onClick={handleLogout}
                  type="button"
                >
                  <span className="hidden sm:inline">Sair</span>
                  <LogOut size={18} className="text-red-400" />
                </button>
              </>
            ) : (
              <Link href="/sign-in" className="text-lg hover:text-gray-600">
                Login
              </Link>
            )}
          </div>

          <ModeToggle />

        </div>
      </header>

      <hr className="border-t text-gray-900 shadow-2xl h-0.5" />

      <main className="p-6">{children}</main>
    </div>
  );
}
