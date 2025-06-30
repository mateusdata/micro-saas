"use client";
import { logout } from "./logout";

export const handleLogout = async () => {
  try {
    localStorage.removeItem("user");
    await logout(); // Chama a função diretamente
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
  }
};