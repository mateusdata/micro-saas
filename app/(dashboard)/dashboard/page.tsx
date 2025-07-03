'use client'
import { useAuth } from '@/contexts/AuthProvider';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner'
import { Toaster } from '@/components/ui/sonner';

interface EmployeeData {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export default function Employees() {
  const [employees, setEmployees] = useState<EmployeeData[]>([]);
  const { user, setUser } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEmployees();
    setUser(JSON.parse(localStorage.getItem('user') || '{}'));
  }, []);

  const fetchEmployees = async () => {
    const response = await axios.get('/api/users');
    setEmployees(response.data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/users', form);
      setShowModal(false);
      setForm({ name: '', email: '', password: '' });
      fetchEmployees();
      toast.success('Event has been created')
      toast("Event has been created", {
         description: `Usuário ${form.name} adicionado com sucesso!`,
         action: {
           label: undefined,
           onClick: () => console.log("Undo"),
         },
       })

    } catch (err) {
      alert('Erro ao adicionar usuário');
    }
    setLoading(false);
  };

  return (
    <main className="flex flex-col items-center">
      <Toaster  position='top-right'   />  

      <div className="w-full max-w-5xl">
        <h1 className="text-3xl font-extrabold text-center mb-2 text-foreground tracking-tight">
          Meus funcionários
        </h1>
        <span className="block text-base text-muted-foreground text-center mb-8">
          {`Olá, ${user?.name || ''}`}
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {employees.map((employee) => (
            <section
              key={employee.id}
              className="rounded-2xl border bg-card shadow-lg p-6 flex flex-col gap-2 transition-colors hover:border-primary/60 min-w-0"
            >
              <h2 className="text-xl font-semibold text-foreground break-words">
                {employee.name}
              </h2>
              <p className="text-sm text-muted-foreground break-all">
                {employee.email}
              </p>
              <div className="flex flex-wrap gap-4 mt-2 text-xs text-muted-foreground">
                
                <span>
                  Criado em: <span className="font-medium">{new Date(employee.createdAt).toLocaleDateString()}</span>
                </span>
                <span>
                  Atualizado em: <span className="font-medium">{new Date(employee.updatedAt).toLocaleDateString()}</span>
                </span>
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* Botão flutuante */}
      <Button
        onClick={() => setShowModal(true)}
        className="fixed bottom-8  text-primary right-8 bg-secondary rounded-full w-12 h-12 flex items-center justify-center shadow-lg text-3xl hover:bg-primary/80 transition"
      >
        +
      </Button>

      {/* Modal usando shadcn/ui */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar usuário</DialogTitle>

          </DialogHeader>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
            <Input

              name="name"
              placeholder="Nome"
              value={form.name}
              onChange={handleChange}
              className="border rounded px-3 py-2"
              required
            />
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="border rounded px-3 py-2"
              required
            />
            <Input
              name="password"
              type="password"
              placeholder="Senha"
              value={form.password}
              onChange={handleChange}
              className="border rounded px-3 py-2"
              required
            />
            <Button
              type="submit"
              className=" rounded px-4 py-2 font-semibold"
              disabled={loading}
            >
              {loading ? 'Adicionando...' : 'Adicionar'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  );
}
