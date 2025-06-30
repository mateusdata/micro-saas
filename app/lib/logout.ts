"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  const cookieStore = cookies();
  (await cookieStore).delete("user");
  redirect("/sign-in");
 
}