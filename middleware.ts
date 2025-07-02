import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const publicRoutes = ["/", "/sign-in", "/sign-up"];

export async function middleware(request: NextRequest) {
  console.log("Middleware executado");

  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  if (publicRoutes.includes(pathname)) {
    console.log(`Acesso liberado à rota pública: ${pathname}`);
    return NextResponse.next();
  }

  if (!token) {
    console.warn("Token não encontrado, redirecionando para /sign-in");
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  try {
    const payload = await jwtVerify(token, secret);
    console.log("JWT válido (payload):", payload);
    return NextResponse.next();
  } catch (err) {
    console.warn("JWT inválido ou expirado:", err);
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|$).*)"],
};
