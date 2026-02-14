"use server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { AuthCredentialsSchema } from "@/schemas/auth.schema";

export const registerUser = async (values: any) => {
    const validatedFields = AuthCredentialsSchema.safeParse(values);

    if (!validatedFields.success) {
        // İlk hata mesajını döndür (Zod'dan gelen error code)
        const firstError = validatedFields.error.issues[0];
        return { error: firstError.message };
    }

    const { email, password, name } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await db.user.findUnique({
        where: { email }
    });

    if (existingUser) {
        if (!existingUser.hasCompletedOnboarding) {
            // Kullanıcı var ama onboarding bitmemiş -> İzin ver
            return { success: true, userId: existingUser.id };
        }
        return { error: "EMAIL_IN_USE" };
    }

    try {
        const user = await db.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                hasCompletedOnboarding: false
            },
        });

        return { success: true, userId: user.id };
    } catch (error) {
        console.error("Register Error:", error);
        return { error: "REGISTRATION_FAILED" };
    }
};