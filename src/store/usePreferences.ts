import { create } from "zustand";
import { persist } from "zustand/middleware";

type Language = "en" | "bn";
type Currency = "USD" | "BDT";

interface PreferencesState {
  language: Language;
  currency: Currency;
  setLanguage: (lang: Language) => void;
  setCurrency: (curr: Currency) => void;
}

export const usePreferences = create<PreferencesState>()(
  persist(
    (set) => ({
      language: "en",
      currency: "USD",
      setLanguage: (language) => set({ language }),
      setCurrency: (currency) => set({ currency }),
    }),
    { name: "marketplace-prefs" },
  ),
);
