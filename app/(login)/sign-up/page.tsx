"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { login } from "@/app/lib/auth";

const signUpSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type SignUpInput = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const [user, setUser] = useState<SignUpInput>({ name: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const parsed = signUpSchema.safeParse(user);
    if (!parsed.success) {
      setError(parsed.error.errors[0].message);
      return;
    }

    try {
      const res = await axios.post("/api/sign-up", user);
      const data = res.data;
      const { token, ...userWithoutToken } = data;
      localStorage.setItem("user", JSON.stringify(userWithoutToken));
      login(data.token);
      router.push("/dashboard");
    } catch (err) {
      setError("Erro ao criar conta.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen flex-col gap-4">
      <form
        onSubmit={handleSignUp}
        className="shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col gap-4 w-80"
      >
        <h2 className="text-xl text-center font-bold mb-2">Criar conta</h2>
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
          className="rounded px-1 bg-blue-900 hover:bg-blue-700 text-white"
        >
          Criar conta
        </button>
      </form>
    </div>
  );
}
