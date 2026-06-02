import {createContext, useContext, useEffect, useState} from "react";
import {STORAGE_KEYS} from "../utils/storageKeys";

const ThemeContext = createContext(null);

const THEME_MODES = {
    LIGHT: "light",
    DARK: "dark",
    SYSTEM: "system",
};

function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? THEME_MODES.DARK : THEME_MODES.LIGHT;
}

function getStoredThemeMode() {
    const storedTheme = localStorage.getItem(STORAGE_KEYS.THEME_MODE);

    if (storedTheme === THEME_MODES.LIGHT || storedTheme === THEME_MODES.DARK || storedTheme === THEME_MODES.SYSTEM) {
        return storedTheme;
    }

    return THEME_MODES.LIGHT;
}

export function ThemeProvider({children}) {
    const [themeMode, setThemeMode] = useState(getStoredThemeMode);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.THEME_MODE, themeMode);

        const activeTheme = themeMode === THEME_MODES.SYSTEM ? getSystemTheme() : themeMode;

        document.documentElement.setAttribute("data-theme", activeTheme);
    }, [themeMode]);

    function toggleTheme() {
        setThemeMode((currentMode) => (currentMode === THEME_MODES.DARK ? THEME_MODES.LIGHT : THEME_MODES.DARK));
    }

    return (
        <ThemeContext.Provider
            value={{
                themeMode,
                setThemeMode,
                toggleTheme,
                themeModes: THEME_MODES,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("useTheme must be used inside ThemeProvider");
    }

    return context;
}
