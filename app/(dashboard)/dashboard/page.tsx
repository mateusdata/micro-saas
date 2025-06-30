'use client'
import { useAuth } from '@/contexts/AuthProvider';
import axios from 'axios'
import React, { useEffect, useState } from 'react'

interface EmployeeData {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export default function Employees() {
  const [employees, setEmployees] = useState<EmployeeData[]>([]);
  const {user, setUser} = useAuth();

  useEffect(() => {
    fetchEmployees();
    setUser(JSON.parse(localStorage.getItem('user') || '[]'));
  }, []);

  const fetchEmployees = async () => {
    const response = await axios.get('/api/users');
    setEmployees(response.data);
  };

 
  return (
    <main className="flex flex-col items-center gap-6 justify-center p-6">
      <h1>Meus funcionarios</h1>
      {`Olá, ${user?.name}`}
      <div className='flex flex-col md:flex-row'>
        {employees.map((employee) => (
          <section
            key={employee.id}
            className="border rounded-xl shadow p-5 min-w-[260px]"
          >
            <h1 className="text-xl font-semibold mb-2">{employee.name}</h1>
            <p className="mb-1">{employee.email}</p>
            <p className="mb-1 text-sm">
              Criado em: {new Date(employee.createdAt).toLocaleDateString()}
            </p>
            <p className="text-sm">
              Atualizado em: {new Date(employee.updatedAt).toLocaleDateString()}
            </p>
          </section>
        ))}
      </div>

    
    </main>
  );
}
