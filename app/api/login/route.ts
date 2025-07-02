import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/app/lib/prisma";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const JWT_SECRET = process.env.JWT_SECRET;
  

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Senha inválida" }, { status: 401 });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET!,
      { expiresIn: "5h" }
    );

    // Omitindo a senha do retorno
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({ ...userWithoutPassword, token }, { status: 200 });

  } catch (error) {
    console.error("Erro na rota /api/login:", error);
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}
