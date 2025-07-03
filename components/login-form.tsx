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

const userSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Senha obrigatória"),
});

type UserInput = z.infer<typeof userSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [user, setUser] = useState<UserInput>({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const parsed = userSchema.safeParse(user);
    if (!parsed.success) {
      setError(parsed.error.errors[0].message);
      return;
    }

    try {
      const res = await axios.post("/api/login", user);
      const data = res.data;
      const { token, ...userWithoutToken } = data;
      localStorage.setItem("user", JSON.stringify(userWithoutToken));
      await login(data.token);
      router.push("/dashboard");
    } catch (err) {
      console.error("Erro:", err);
      setError("Erro ao fazer login.");
    }finally{
      setIsLoading(false);
    }
  };

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={handleLogin} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Entrar na sua conta</h1>
        <p className="text-muted-foreground text-sm">
          Digite seu email abaixo para acessar sua conta
        </p>
      </div>
      <div className="grid gap-6">
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
          <div className="flex items-center">
            <Label htmlFor="password">Senha</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Esqueceu a senha?
            </a>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>

        {error && <div className="text-sm text-red-500">{error}</div>}

        <Button type="submit" className="w-full" disabled={isLoading || !user.email || !user.password}>
          {isLoading ? (
            <Loader2 size={20} className="animate-spin mr-2" />
          ) : (
            "Entrar"
          )}
        </Button>

        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Ou continue com
          </span>
        </div>

        <Button variant="outline" type="button" className="w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12 .297c-6.63 0-12 5.373-12 12 
              0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 
              0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61
              C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 
              1.205.084 1.838 1.236 1.838 1.236 
              1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605
              -2.665-.3-5.466-1.332-5.466-5.93 
              0-1.31.465-2.38 1.235-3.22
              -.135-.303-.54-1.523.105-3.176 
              0 0 1.005-.322 3.3 1.23
              .96-.267 1.98-.399 3-.405
              1.02.006 2.04.138 3 .405
              2.28-1.552 3.285-1.23 3.285-1.23
              .645 1.653.24 2.873.12 3.176
              .765.84 1.23 1.91 1.23 3.22
              0 4.61-2.805 5.625-5.475 5.92
              .42.36.81 1.096.81 2.22 
              0 1.606-.015 2.896-.015 3.286 
              0 .315.21.69.825.57
              C20.565 22.092 24 17.592 24 12.297
              c0-6.627-5.373-12-12-12"
              fill="currentColor"
            />
          </svg>
          Entrar com GitHub
        </Button>
      </div>
      <div className="text-center text-sm">
        Não tem uma conta?{" "}
        <Link href="/sign-up" className="underline underline-offset-4">
          Cadastre-se
        </Link>
      </div>
    </form>
  );
}
