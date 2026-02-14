"use server";

import { signIn } from "@/auth";

export const googleSignIn = async () => {
    // Google OAuth ile giriş yap, başarılı olunca ana sayfaya yönlendir
    await signIn("google", { redirectTo: "/" });
};
