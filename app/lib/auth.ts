
"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export async function login(token: string) {
  const cookieStore = cookies();
  // console.log("Usuário autenticado:", formData);
  // Manipular cookies ou realizar outras operações server-side
  console.log("🔒 Login realizado com sucesso, token:", token);
  (await cookieStore).set("token", token, { httpOnly: false });

  return { success: true, message: "Login realizado com sucesso!" };

}
