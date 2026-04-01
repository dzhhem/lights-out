import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type Settings } from "../types/settings";

interface SettingsState {
  settings: Settings;
  isOpen: boolean;
  updateSettings: (_newSettings: Partial<Settings>) => void;
  openSettings: () => void;
  closeSettings: () => void;
}

const DEFAULT_SETTINGS: Settings = {
  size: 4,
  timer: 60,
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: DEFAULT_SETTINGS,
      isOpen: false,

      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),

      openSettings: () => set({ isOpen: true }),

      closeSettings: () => set({ isOpen: false }),
    }),
    {
      name: "lights-out-settings",
    },
  ),
);
