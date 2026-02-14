"use server";

import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas/auth.schema";
import { AuthError } from "next-auth";
import { db } from "@/lib/db";

export const login = async (values: any) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        // İlk hata mesajını döndür (Zod'dan gelen error code)
        const firstError = validatedFields.error.issues[0];
        return { error: firstError.message };
    }

    const { email, password } = validatedFields.data;

    try {
        await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        // Giriş başarılı, şimdi onboarding durumunu kontrol et
        const user = await db.user.findUnique({
            where: { email },
            select: { id: true, hasCompletedOnboarding: true }
        });

        if (!user) return { error: "USER_NOT_FOUND" };

        return {
            success: true,
            userId: user.id,
            hasCompletedOnboarding: user.hasCompletedOnboarding
        };

    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "INVALID_CREDENTIALS" };
                default:
                    return { error: "LOGIN_FAILED" };
            }
        }
        throw error;
    }
};
