import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Simulated auth check - gerçek projede bu JWT token kontrolü olacak
function isAuthenticated(request: NextRequest): boolean {
  // Şimdilik cookie'den auth token kontrolü yapıyoruz
  const authToken = request.cookies.get("auth-token");
  return !!authToken?.value;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Root path (/) erişiminde /panel'e yönlendir
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/panel", request.url));
  }

  // Login sayfası - eğer zaten giriş yapmışsa /panel'e yönlendir
  if (pathname === "/login") {
    if (isAuthenticated(request)) {
      return NextResponse.redirect(new URL("/panel", request.url));
    }
    return NextResponse.next();
  }

  // Protected routes - /panel ile başlayan tüm sayfalar
  if (pathname.startsWith("/panel")) {
    if (!isAuthenticated(request)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  // Diğer tüm sayfalar için normal devam
  return NextResponse.next();
}

// Middleware'in hangi path'lerde çalışacağını belirtiyoruz
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
