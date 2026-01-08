import { create } from "zustand";
import type { Settings } from "../types/settings";

interface SettingsState {
	settings: Settings;
	isSettingsOpen: boolean;
	setSettings: (_newSettings: Settings) => void;
	openSettings: () => void;
	closeSettings: () => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
	settings: {
		size: 4,
		timer: 0,
	},
	isSettingsOpen: false,
	setSettings: (newSettings) => set({ settings: newSettings }),
	openSettings: () => set({ isSettingsOpen: true }),
	closeSettings: () => set({ isSettingsOpen: false }),
}));
