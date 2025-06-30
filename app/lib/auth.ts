
"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface FormData {
  name: string;
  email: string;
  password: string;
  token?: string;
}

export async function login(formData: FormData) {
  const cookieStore = cookies();
  // console.log("Usuário autenticado:", formData);
  // Manipular cookies ou realizar outras operações server-side
  (await cookieStore).set("user", JSON.stringify(formData), { httpOnly: true });
  
  return { success: true, message: "Login realizado com sucesso!" };
  
}
