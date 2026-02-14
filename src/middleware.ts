// middleware.ts
export { auth as middleware } from "@/auth"

// Sadece belirli sayfalarda çalışması için config:
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}