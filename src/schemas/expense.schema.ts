import { z } from "zod";

// Kategorileri sabit bir liste (Enum) olarak tanımlamak veritabanı tutarlılığı sağlar.
const CATEGORIES = ["Market", "Ulaşım", "Fatura", "Eğlence", "Sağlık", "Diğer"] as const;

export const ExpenseSchema = z.object({

  description: z.string()
    .min(2, { message: "Harcama açıklaması en az 2 karakter olmalıdır." })
    .max(50, { message: "Açıklama 50 karakteri geçemez." }) // Veritabanı şişmesini önler
    .trim(), // Baş/son boşlukları temizler

  // HTML input'tan gelen string "500" değerini number 500'e çevirir
  amount: z.coerce.number()
    .positive({ message: "Tutar 0'dan büyük olmalıdır." })
    .max(1000000, { message: "Çok yüksek bir tutar girdiniz, lütfen kontrol edin." }) // Mantıksız değerleri engeller
    .transform((val) => Number(val.toFixed(2))), // Finansal hassasiyet: virgülden sonra max 2 hane

  // Serbest metin yerine Enum kullanımı
  category: z.enum(CATEGORIES as unknown as [string, ...string[]], {
    message: "Lütfen geçerli bir kategori seçiniz.",
  }),

  // Tarih boş gelirse Zod otomatik olarak şu anı atar (Controller'da uğraşmazsınız)
  date: z.coerce.date()
    .default(() => new Date()),

  // AI Alanları
  isAiGenerated: z.boolean().default(false), // Varsayılan değer atamak iyidir

  // AI güven skoru genellikle 0.0 ile 1.0 arasındadır. Bunu kısıtlamak hatayı önler.
  aiConfidence: z.number()
    .min(0)
    .max(1)
    .optional(),
});

export type ExpenseType = z.infer<typeof ExpenseSchema>;