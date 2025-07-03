import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="max-w-2xl mx-auto">
      <Card className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-5">
        <h1 className="text-3xl font-extrabold mb-6 text-center tracking-tight">
          Bem-vindo ao Micro SaaS <span className="text-indigo-500">MData</span>
        </h1>

        <p className="mb-8 text-lg leading-relaxed text-center text-muted-foreground">
          O <strong>MData</strong> é uma solução inovadora para automatizar e otimizar processos de dados no seu negócio.
          Com uma interface simples e recursos poderosos, você pode transformar a maneira como gerencia informações e toma decisões.
        </p>

        <ul className="space-y-4 mb-8">
          {[
            "Automatize tarefas repetitivas de dados",
            "Visualize insights em tempo real",
            "Integração fácil com suas ferramentas favoritas",
          ].map((item) => (
            <li key={item} className="flex items-center gap-3 p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Check className="h-6 w-6 text-indigo-500" />
              <span className="font-medium text-gray-100">{item}</span>
            </li>
          ))}
        </ul>

        <Link href="/sign-in" className="flex justify-center">
          <Button size="lg" variant="default">
            Experimente Agora
          </Button>
        </Link>

        <p className="mt-6 text-center text-lg leading-relaxed text-muted-foreground">
          Leve sua empresa para o próximo nível com o <strong>MData</strong>!
        </p>
      </Card>
    </div>
  );
}
