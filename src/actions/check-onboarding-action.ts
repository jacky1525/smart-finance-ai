"use server";

import { db } from "@/lib/db";

export const checkOnboardingStatus = async (userId: string) => {
    if (!userId) return null;

    try {
        const user = await db.user.findUnique({
            where: { id: userId },
            select: { hasCompletedOnboarding: true }
        });

        return user?.hasCompletedOnboarding ?? false;
    } catch (error) {
        console.error("Check onboarding error:", error);
        return null;
    }
};
