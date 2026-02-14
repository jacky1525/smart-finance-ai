import { z } from "zod";

// Kayıt formu için şema (isim + email + şifre)
export const AuthCredentialsSchema = z.object({
    name: z.string({ message: "NAME_REQUIRED" })
        .min(2, { message: "NAME_TOO_SHORT" }),

    email: z.string({ message: "EMAIL_REQUIRED" })
        .email({ message: "INVALID_EMAIL" }),

    password: z.string({ message: "PASSWORD_REQUIRED" })
        .min(8, { message: "PASSWORD_TOO_SHORT" })
        .regex(/[A-Z]/, { message: "PASSWORD_NO_UPPERCASE" })
        .regex(/[0-9]/, { message: "PASSWORD_NO_NUMBER" }),
});

// Giriş formu için şema (sadece email + şifre)
export const LoginSchema = z.object({
    email: z.string({ message: "EMAIL_REQUIRED" })
        .email({ message: "INVALID_EMAIL" }),
    password: z.string({ message: "PASSWORD_REQUIRED" })
        .min(1, { message: "PASSWORD_REQUIRED" })
});

export const OnboardingSchema = z.object({
    // Step 1: Hedef
    goal: z.string({ message: "Lütfen bir hedef seçiniz." })
        .min(1, { message: "Bir hedef seçmelisiniz." }),

    // Step 2: Bireysel Profil
    age: z.coerce.number()
        .min(18, { message: "18 yaşından büyük olmalısınız." })
        .max(100, { message: "Lütfen geçerli bir yaş giriniz." }),

    employment: z.string()
        .min(1, { message: "Çalışma durumu seçiniz." }),

    income: z.coerce.number()
        .min(0, { message: "Gelir 0'dan küçük olamaz." }),

    // Step 3: Aile
    maritalStatus: z.enum(["single", "married"] as const, {
        message: "Medeni durum seçiniz."
    }),

    spouseWork: z.boolean().default(false),

    spouseIncome: z.coerce.number().optional().default(0),

    // Step 4: Varlıklar
    savings: z.coerce.number()
        .min(0, { message: "Birikim 0'dan küçük olamaz." }),

    assets: z.array(z.string()).default([]),

    // Step 5: AI & Risk
    aiExp: z.string()
        .min(1, { message: "AI deneyiminizi seçiniz." }),

    risk: z.string()
        .min(1, { message: "Risk profilinizi seçiniz." }),
});

export type AuthCredentialsValues = z.infer<typeof AuthCredentialsSchema>;
export type OnboardingValues = z.infer<typeof OnboardingSchema>;
