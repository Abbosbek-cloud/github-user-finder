import React, {
  createContext,
  useState,
  useMemo,
  useEffect,
  useContext,
} from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import type { Theme, PaletteMode } from "@mui/material";
import type { ThemeContextType } from "@/types/github.types";
import { createAppTheme } from "@/theme";

// Create context with proper typing
const ThemeContext = createContext<ThemeContextType | null>(null);

// Provider props
interface ThemeProviderProps {
  children: React.ReactNode;
}

// Theme provider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Get initial theme from localStorage or default to 'light'
  const [mode, setMode] = useState<PaletteMode>(() => {
    const savedMode = localStorage.getItem("themeMode");
    return (savedMode as PaletteMode) || "light";
  });

  // Save theme preference to localStorage
  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  // Toggle between light and dark mode
  const toggleTheme = (): void => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  // Create theme object based on current mode
  const theme: Theme = useMemo(() => createAppTheme(mode), [mode]);

  const value: ThemeContextType = {
    mode,
    toggleTheme,
    theme,
  };

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export default ThemeContext;
