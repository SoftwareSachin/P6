import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        success: {
          DEFAULT: "var(--success)",
          foreground: "var(--success-foreground)",
        },
        warning: {
          DEFAULT: "var(--warning)",
          foreground: "var(--warning-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          "1": "var(--chart-1)",
          "2": "var(--chart-2)",
          "3": "var(--chart-3)",
          "4": "var(--chart-4)",
          "5": "var(--chart-5)",
        },
        // OPPB Brand Colors
        oppb: {
          purple: "#6739B7",
          success: "#00C851",
          error: "#FF3547",
          warning: "#FFB300",
          offline: "#FF6900",
        },
        neutral: {
          bg: "#F8F9FA",
          card: "#FFFFFF",
          text: "#1C1C1E",
          textSecondary: "#8E8E93",
          border: "#E5E5E7",
        },
        sidebar: {
          DEFAULT: "var(--sidebar-background)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },
      },
      fontFamily: {
        sans: ["SF Pro Display", "Roboto", "system-ui", "sans-serif"],
      },
      fontSize: {
        "heading-1": ["28px", { fontWeight: "700" }],
        "heading-2": ["24px", { fontWeight: "700" }],
        "heading-3": ["20px", { fontWeight: "600" }],
        "body-large": ["16px", { fontWeight: "400" }],
        "body": ["14px", { fontWeight: "400" }],
        "caption": ["12px", { fontWeight: "400" }],
        "button": ["16px", { fontWeight: "600" }],
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "shimmer": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "bounce-check": {
          "0%, 20%": { transform: "scale(0)" },
          "40%": { transform: "scale(1.2)" },
          "60%": { transform: "scale(0.9)" },
          "80%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.33)", opacity: "1" },
          "80%, 100%": { transform: "scale(2.4)", opacity: "0" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "shimmer": "shimmer 2s infinite",
        "bounce-check": "bounce-check 0.6s ease-out",
        "scan-line": "scan-line 2s linear infinite",
        "pulse-ring": "pulse-ring 1.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite",
        "fade-in-up": "fade-in-up 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
