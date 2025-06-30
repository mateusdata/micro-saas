"use client";

import { useState } from "react";
import { login } from "@/app/lib/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface FormatUser {
  name: string;
  email: string;
  password: string;
  token: string;
}
interface FormatResult {
  success: boolean;
  message: string;
}

export default function SignIn() {
  const [user, setUser] = useState<FormatUser>({
    name: "",
    email: "",
    password: "",
    token: "123token",
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateEmail(user.email)) {
      setError("Email inválido.");
      return;
    }
    if (user.password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    try {
      const result: FormatResult = await login(user);
      if (result.success) {
        localStorage.setItem("user", JSON.stringify(user));
        router.push("/dashboard");
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError("Erro ao fazer login.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen flex-col gap-4">

      <form
        onSubmit={handleLogin}
        className=" shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col gap-4 w-80"
      >
        <h2 className="text-xl text-center font-bold mb-2">Entrar</h2>
        <input
          className="border rounded px-3 py-2"
          type="text"
          name="name"
          placeholder="Nome"
          value={user.name}
          onChange={handleChange}
          required
          autoComplete="off"
        />
        <input
          className="border rounded px-3 py-2"
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          required
          autoComplete="off"
        />
        <input
          className="border rounded px-3 py-2"
          type="password"
          name="password"
          placeholder="Senha"
          value={user.password}
          onChange={handleChange}
          required
          autoComplete="new-password"
        />
        <Link href="/sign-in" className="text-blue-500 text-right hover:underline">
         Fazer login
        </Link>

        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button
          type="submit"
          className="rounded px-1 bg-blue-900 hover:bg-blue-700"
        >
          Criar conta
        </button>
      </form>

    </div>
  );
}
