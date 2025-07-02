import { prisma } from '@/app/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import z from 'zod';
import { PrismaClientKnownRequestError } from '@/prisma/generated/prisma/runtime/library';
const saltRounds = 10;

const userSchema = z.object({
  name: z.string().min(1, 'Nome obrigatório'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (id) {
    // Buscar usuário específico
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(user);
  } else {
    // Buscar todos usuários
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  }
}


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parseResult = userSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json({ error: parseResult.error.errors }, { status: 400 });
    }
    const { name, email, password } = parseResult.data;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 409 });
    }
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 400 });
  }
}



export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Missing user id' }, { status: 400 });
    }

    const body = await req.json();
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      console.error('P2002 Error meta:', error.meta);
      return NextResponse.json({ error: 'Email already exists', meta: error.meta }, { status: 409 });
    }
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 400 });
  }
}
