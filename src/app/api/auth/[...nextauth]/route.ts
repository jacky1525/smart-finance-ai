// src/app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/auth" // src/auth.ts dosyasından import ediyoruz

export const { GET, POST } = handlers