import { NextRequest, NextResponse } from "next/server";

const publicRoutes = [
  '/',
  '/sign-in',
  '/sign-up',
];

export function middleware(request: NextRequest) {
  console.log("Middleware executado");
  const userCookie = request.cookies.get("user");
  const user = userCookie?.value ? JSON.parse(userCookie.value) : null;
  //console.log("Cookie do usuário:", user);
  //console.log("Rota atual:", request.nextUrl.pathname);
  // Verifica se a rota é pública
  
  if (publicRoutes.includes(request.nextUrl.pathname)) {
    // Se a rota for pública, permite o acesso sem autenticação
    return NextResponse.next();
  }

  if (!user) {
    console.log("Usuário não autenticado, redirecionando para a página de login");

    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|$).*)' // tudo exceto api, estáticos, favicon e a rota raiz (/)
  ],
}
