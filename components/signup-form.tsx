"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { login } from "@/app/lib/auth";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

const signUpSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type SignUpInput = z.infer<typeof signUpSchema>;

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [user, setUser] = useState<SignUpInput>({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const parsed = signUpSchema.safeParse(user);
    if (!parsed.success) {
      setError(parsed.error.errors[0].message);
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post("/api/users", user);
      const data = res.data;
      const { token, ...userWithoutToken } = data;
      localStorage.setItem("user", JSON.stringify(userWithoutToken));
      login(data.token);
      router.push("/dashboard");
    } catch (err) {
      console.error("Erro:", err);
      setError("Erro ao criar conta.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSignUp}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Crie sua conta</h1>
        <p className="text-muted-foreground text-sm">
          Preencha os campos abaixo para se cadastrar
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="name">Nome</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Seu nome"
            value={user.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@exemplo.com"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Sua senha"
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>

        {error && <div className="text-sm text-red-500">{error}</div>}

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading || !user.name || !user.email || !user.password}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Criando conta...
            </>
          ) : (
            "Criar conta"
          )}
        </Button>

        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Já tem uma conta?
          </span>
        </div>

        <Button variant="outline" type="button" className="w-full">
          <Link href="/sign-in" className="w-full text-center">
            Entrar com conta existente
          </Link>
        </Button>
      </div>
    </form>
  );
}
