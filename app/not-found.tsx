import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-5xl font-bold mb-4 text-primary">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Página não encontrada</h2>
        <p className="mb-6 text-muted-foreground">
          Esta página não pôde ser encontrada.
        </p>
        <div className="mb-6 animate-pulse">
          <span role="img" aria-label="piada">🕵️‍♂️</span>
            <span className="ml-2 text-muted-foreground">
              Parece que você se perdeu pelo Micro SaaS MData. Que tal voltar para o início?
            </span>
        </div>
        <Link href="/" passHref>
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Voltar para o início
          </Button>
        </Link>
      </div>
    </div>
  );
}