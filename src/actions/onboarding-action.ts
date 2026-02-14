"use server";

import { db } from "@/lib/db";
import { OnboardingSchema } from "@/schemas/auth.schema";
import { revalidatePath } from "next/cache";

export const completeOnboarding = async (userId: string, data: any) => {
    if (!userId) {
        return { error: "NO_USER_ID" };
    }

    // 1. Verileri doğrula
    const validatedFields = OnboardingSchema.safeParse(data);
    if (!validatedFields.success) {
        console.log("Validation errors:", validatedFields.error.issues);
        const firstError = validatedFields.error.issues[0];
        return { error: firstError?.message || "INVALID_DATA" };
    }

    try {
        // ... transaction logic ...
        // (This part remains the same)
        // 2. Transaction: Profil oluştur + User flag güncelle
        await db.$transaction(async (tx) => {
            // Profil oluştur
            await tx.financialProfile.create({
                data: {
                    userId,
                    primaryAmbition: validatedFields.data.goal,
                    age: validatedFields.data.age,
                    employmentStatus: validatedFields.data.employment,
                    annualIncome: validatedFields.data.income,
                    maritalStatus: validatedFields.data.maritalStatus,
                    spouseEmployed: validatedFields.data.spouseWork,
                    spouseAnnualIncome: validatedFields.data.spouseIncome,
                    totalLiquidSavings: validatedFields.data.savings,
                    assets: validatedFields.data.assets,
                    aiExperience: validatedFields.data.aiExp,
                    riskAppetite: validatedFields.data.risk,
                },
            });

            // User'ı güncelle
            await tx.user.update({
                where: { id: userId },
                data: { hasCompletedOnboarding: true },
            });
        });

        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Onboarding Error:", error);
        return { error: "PROFILE_CREATION_ERROR" };
    }
};
