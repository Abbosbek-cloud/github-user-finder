import {
  createTheme,
  type Theme,
  type PaletteMode,
  type ThemeOptions,
} from "@mui/material/styles";
import { light_colors } from "./light";
import { dark_colors } from "./dark";

// Custom color palette
const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === "light" ? light_colors : dark_colors),
  },
  typography: {
    fontFamily: [
      "Inter",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    h1: {
      fontWeight: 800,
      fontSize: "2.5rem",
      lineHeight: 1.2,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontWeight: 700,
      fontSize: "2rem",
      lineHeight: 1.3,
      letterSpacing: "-0.01em",
    },
    h3: {
      fontWeight: 700,
      fontSize: "1.75rem",
      lineHeight: 1.3,
      letterSpacing: "-0.01em",
    },
    h4: {
      fontWeight: 700,
      fontSize: "1.5rem",
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.25rem",
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 600,
      fontSize: "1.125rem",
      lineHeight: 1.4,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
    },
    button: {
      fontWeight: 600,
      textTransform: "none",
      letterSpacing: "0.01em",
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    "none",
    mode === "light"
      ? "0px 2px 4px rgba(0, 0, 0, 0.05)"
      : "0px 2px 4px rgba(0, 0, 0, 0.2)",
    mode === "light"
      ? "0px 4px 8px rgba(0, 0, 0, 0.06)"
      : "0px 4px 8px rgba(0, 0, 0, 0.3)",
    mode === "light"
      ? "0px 8px 16px rgba(0, 0, 0, 0.08)"
      : "0px 8px 16px rgba(0, 0, 0, 0.4)",
    mode === "light"
      ? "0px 12px 24px rgba(0, 0, 0, 0.1)"
      : "0px 12px 24px rgba(0, 0, 0, 0.5)",
    mode === "light"
      ? "0px 16px 32px rgba(0, 0, 0, 0.12)"
      : "0px 16px 32px rgba(0, 0, 0, 0.6)",
    mode === "light"
      ? "0px 20px 40px rgba(0, 0, 0, 0.14)"
      : "0px 20px 40px rgba(0, 0, 0, 0.7)",
    mode === "light"
      ? "0px 24px 48px rgba(0, 0, 0, 0.16)"
      : "0px 24px 48px rgba(0, 0, 0, 0.8)",
    // Continue pattern for remaining shadow levels (8-24)
    ...Array(17).fill(
      mode === "light"
        ? "0px 24px 48px rgba(0, 0, 0, 0.16)"
        : "0px 24px 48px rgba(0, 0, 0, 0.8)"
    ),
  ] as any,
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
    easing: {
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: "thin",
          scrollbarColor:
            mode === "light" ? "#cbd5e1 #f1f5f9" : "#475569 #1e293b",
          "&::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: mode === "light" ? "#f1f5f9" : "#1e293b",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: mode === "light" ? "#cbd5e1" : "#475569",
            borderRadius: "4px",
            "&:hover": {
              backgroundColor: mode === "light" ? "#94a3b8" : "#64748b",
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backdropFilter: "blur(10px)",
          background:
            mode === "light"
              ? "rgba(255, 255, 255, 0.8)"
              : "rgba(30, 41, 59, 0.8)",
          border: `1px solid ${
            mode === "light"
              ? "rgba(226, 232, 240, 0.6)"
              : "rgba(51, 65, 85, 0.6)"
          }`,
          boxShadow:
            mode === "light"
              ? "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)"
              : "0 8px 16px -2px rgba(0, 0, 0, 0.4), 0 4px 8px -2px rgba(0, 0, 0, 0.3)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
        elevation1: {
          boxShadow:
            mode === "light"
              ? "0 2px 4px rgba(0, 0, 0, 0.05)"
              : "0 2px 4px rgba(0, 0, 0, 0.2)",
        },
        elevation2: {
          boxShadow:
            mode === "light"
              ? "0 4px 8px rgba(0, 0, 0, 0.06)"
              : "0 4px 8px rgba(0, 0, 0, 0.3)",
        },
        elevation3: {
          boxShadow:
            mode === "light"
              ? "0 8px 16px rgba(0, 0, 0, 0.08)"
              : "0 8px 16px rgba(0, 0, 0, 0.4)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: "none",
          fontWeight: 600,
          padding: "10px 24px",
          fontSize: "0.9375rem",
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-1px)",
            boxShadow:
              mode === "light"
                ? "0 4px 12px rgba(99, 102, 241, 0.3)"
                : "0 4px 12px rgba(129, 140, 248, 0.4)",
          },
          "&:active": {
            transform: "translateY(0)",
          },
        },
        contained: {
          boxShadow:
            mode === "light"
              ? "0 2px 8px rgba(99, 102, 241, 0.25)"
              : "0 2px 8px rgba(129, 140, 248, 0.3)",
          "&:hover": {
            boxShadow:
              mode === "light"
                ? "0 4px 16px rgba(99, 102, 241, 0.35)"
                : "0 4px 16px rgba(129, 140, 248, 0.4)",
          },
        },
        outlined: {
          borderWidth: "2px",
          "&:hover": {
            borderWidth: "2px",
          },
        },
        sizeLarge: {
          padding: "12px 32px",
          fontSize: "1rem",
        },
        sizeSmall: {
          padding: "6px 16px",
          fontSize: "0.875rem",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(10px)",
          borderBottom: `1px solid ${
            mode === "light"
              ? "rgba(226, 232, 240, 0.6)"
              : "rgba(51, 65, 85, 0.6)"
          }`,
        },
        colorPrimary: {
          background:
            mode === "light"
              ? "rgba(99, 102, 241, 0.95)"
              : "rgba(129, 140, 248, 0.95)",
          backdropFilter: "blur(10px)",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            backgroundColor:
              mode === "light"
                ? "rgba(99, 102, 241, 0.08)"
                : "rgba(129, 140, 248, 0.12)",
            transform: "scale(1.05)",
          },
          "&:active": {
            transform: "scale(0.95)",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          borderRadius: 8,
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          cursor: "pointer",
          "&:hover": {
            transform: "translateY(-1px)",
            boxShadow:
              mode === "light"
                ? "0 2px 8px rgba(0, 0, 0, 0.1)"
                : "0 2px 8px rgba(0, 0, 0, 0.3)",
          },
        },
        filled: {
          backdropFilter: "blur(10px)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: mode === "light" ? "#6366f1" : "#818cf8",
                borderWidth: "2px",
              },
            },
            "&.Mui-focused": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderWidth: "2px",
              },
            },
          },
          "& .MuiInputLabel-root": {
            fontWeight: 500,
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          "&:before": {
            borderBottom: `2px solid ${
              mode === "light" ? "#e2e8f0" : "#334155"
            }`,
          },
          "&:hover:not(.Mui-disabled):before": {
            borderBottom: `2px solid ${
              mode === "light" ? "#6366f1" : "#818cf8"
            }`,
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          border: `3px solid ${mode === "light" ? "#ffffff" : "#1e293b"}`,
          boxShadow:
            mode === "light"
              ? "0 4px 12px rgba(0, 0, 0, 0.1)"
              : "0 4px 12px rgba(0, 0, 0, 0.3)",
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backdropFilter: "blur(10px)",
        },
        standardSuccess: {
          backgroundColor:
            mode === "light"
              ? "rgba(16, 185, 129, 0.1)"
              : "rgba(52, 211, 153, 0.15)",
          border: `1px solid ${mode === "light" ? "#10b981" : "#34d399"}`,
        },
        standardError: {
          backgroundColor:
            mode === "light"
              ? "rgba(239, 68, 68, 0.1)"
              : "rgba(248, 113, 113, 0.15)",
          border: `1px solid ${mode === "light" ? "#ef4444" : "#f87171"}`,
        },
        standardWarning: {
          backgroundColor:
            mode === "light"
              ? "rgba(245, 158, 11, 0.1)"
              : "rgba(251, 191, 36, 0.15)",
          border: `1px solid ${mode === "light" ? "#f59e0b" : "#fbbf24"}`,
        },
        standardInfo: {
          backgroundColor:
            mode === "light"
              ? "rgba(59, 130, 246, 0.1)"
              : "rgba(96, 165, 250, 0.15)",
          border: `1px solid ${mode === "light" ? "#3b82f6" : "#60a5fa"}`,
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          height: 6,
        },
        bar: {
          borderRadius: 10,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: mode === "light" ? "#e2e8f0" : "#334155",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none",
          fontWeight: 500,
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            textDecoration: "underline",
            transform: "translateY(-1px)",
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor:
            mode === "light"
              ? "rgba(30, 41, 59, 0.95)"
              : "rgba(241, 245, 249, 0.95)",
          color: mode === "light" ? "#f1f5f9" : "#1e293b",
          fontSize: "0.875rem",
          fontWeight: 500,
          borderRadius: 8,
          padding: "8px 12px",
          backdropFilter: "blur(10px)",
          boxShadow:
            mode === "light"
              ? "0 4px 12px rgba(0, 0, 0, 0.15)"
              : "0 4px 12px rgba(0, 0, 0, 0.4)",
        },
        arrow: {
          color:
            mode === "light"
              ? "rgba(30, 41, 59, 0.95)"
              : "rgba(241, 245, 249, 0.95)",
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: 48,
        },
        indicator: {
          height: 3,
          borderRadius: "3px 3px 0 0",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minHeight: 48,
          fontWeight: 600,
          textTransform: "none",
          fontSize: "0.9375rem",
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            backgroundColor:
              mode === "light"
                ? "rgba(99, 102, 241, 0.04)"
                : "rgba(129, 140, 248, 0.08)",
          },
          "&.Mui-selected": {
            fontWeight: 700,
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 52,
          height: 32,
          padding: 0,
        },
        switchBase: {
          padding: 4,
          "&.Mui-checked": {
            transform: "translateX(20px)",
            "& + .MuiSwitch-track": {
              opacity: 1,
            },
          },
        },
        thumb: {
          width: 24,
          height: 24,
          boxShadow:
            mode === "light"
              ? "0 2px 4px rgba(0, 0, 0, 0.2)"
              : "0 2px 4px rgba(0, 0, 0, 0.4)",
        },
        track: {
          borderRadius: 16,
          opacity: 1,
          backgroundColor: mode === "light" ? "#cbd5e1" : "#475569",
        },
      },
    },
  },
});

export const createAppTheme = (mode: PaletteMode): Theme => {
  return createTheme(getDesignTokens(mode));
};
