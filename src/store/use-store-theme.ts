import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeState {
  theme: string | null;
  setTheme: (theme: string) => void;
}

export const useStoreTheme = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "dark",
      setTheme: (theme: string) => {
        set({ theme });
      },
    }),
    {
      name: "theme",
    }
  )
);
