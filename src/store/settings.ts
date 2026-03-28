import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Settings } from "../types/settings";

interface SettingsState {
  settings: Settings;
  isSettingsOpen: boolean;
  setSettings: (_newSettings: Settings) => void;
  openSettings: () => void;
  closeSettings: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: {
        size: 4,
        timer: 0,
      },
      isSettingsOpen: false,
      setSettings: (newSettings) =>
        set((state) => ({
          settings: {
            ...state.settings,
            ...newSettings,
          },
        })),
      openSettings: () => set({ isSettingsOpen: true }),
      closeSettings: () => set({ isSettingsOpen: false }),
    }),
    {
      name: "lights-out-settings",
      partialize: (state) => ({
        settings: state.settings,
      }),
    },
  ),
);
