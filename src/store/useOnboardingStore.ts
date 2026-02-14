// src/store/useOnboardingStore.ts
import { create } from 'zustand';

export const useOnboardingStore = create((set) => ({
  step: 1,
  formData: {},
  setFormData: (data: any) => set((state: any) => ({ formData: { ...state.formData, ...data } })),
  nextStep: () => set((state: any) => ({ step: state.step + 1 })),
  prevStep: () => set((state: any) => ({ step: state.step - 1 })),
}));