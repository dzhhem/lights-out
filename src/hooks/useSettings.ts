import { useState, useCallback } from "react";

const STORAGE_KEY = "lights-out-settings";

export type Settings = {
	size: number;
	timer: number;
};

const defaultSettings: Settings = {
	size: 4,
	timer: 0,
};

const loadSettings = (): Settings => {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return defaultSettings;
		const parsed = JSON.parse(raw);
		if (
			typeof parsed?.size === "number" &&
			typeof parsed?.timer === "number"
		) {
			return parsed;
		}
		return defaultSettings;
	} catch {
		return defaultSettings;
	}
};

const saveSettings = (s: Settings) => {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
};

const useSettings = () => {
	const [settings, setSettings] = useState<Settings>(() => loadSettings());

	const update = useCallback((next: Settings) => {
		setSettings(next);
		saveSettings(next);
	}, []);

	return { settings, update };
};

export default useSettings;
