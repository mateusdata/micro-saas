export default function HomePage() {
  return (
    <div className="max-w-2xl mx-auto mt-16 p-8rounded-2xl shadow-lg transition-shadow hover:shadow-xl">
      <h1 className="text-3xl font-extrabold mb-6 text-center tracking-tight">
        Bem-vindo ao Micro SaaS Mateus Data
      </h1>
      <p className="mb-6 text-lg leading-relaxed text-center">
        O <strong>Mateus Data</strong> é uma solução inovadora para automatizar e otimizar processos de dados no seu negócio.
        Com uma interface simples e recursos poderosos, você pode transformar a maneira como gerencia informações e toma decisões.
      </p>
      <div className="flex justify-center mb-6">
        <ul className="space-y-3">
          <li className="flex items-center gap-2 p-4 border rounded-lg shadow-sm transition-all hover:shadow-md">
            <span className="text-xl font-medium">✓</span>
            Automatize tarefas repetitivas de dados
          </li>
          <li className="flex items-center gap-2 p-4 border rounded-lg shadow-sm transition-all hover:shadow-md">
            <span className="text-xl font-medium">✓</span>
            Visualize insights em tempo real
          </li>
          <li className="flex items-center gap-2 p-4 border rounded-lg shadow-sm transition-all hover:shadow-md">
            <span className="text-xl font-medium">✓</span>
            Integração fácil com suas ferramentas favoritas
          </li>
        </ul>
      </div>
      <p className="text-center text-lg leading-relaxed">
        Experimente agora e leve sua empresa para o próximo nível com o <strong>Mateus Data</strong>!
      </p>
    </div>
  );
}
