/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      primary: {
        DEFAULT: "#00A257",
        100: "#007A42",
        300: "#EBFFF6",
        400: "#CCFFE7",
        500: "#99FFD0",
        600: "#00522C",
        700: "#003D21",
        800: "#5ACB97",
        900: "#A4EDCB",
        1000: "#E5FFF3",
      },
      secondary: {
        DEFAULT: "#00237B",
        100: "#EBF0FF",
        300: "#CCDAFF",
        400: "#99B6FF",
        500: "#001752",
        600: "#00113D",
        700: "#000B29",
        800: "#D8E2FC",
        900: "#6479C4",
        1000: "#EAF0FF",
      },
      tertiary: {
        DEFAULT: "#FFB422",
        100: "#FFF8EB",
        300: "#FFEDCC",
        400: "#FFDC99",
        500: "#F5A200",
        600: "#CC8700",
        700: "#A36C00",
        800: "#DBA437",
      },
      black: {
        DEFAULT: "#000000",
        100: "#111827",
        200: "#242424",
        300: "#6b7280",
        400: "#4b5563",
        500: "#374151",
        600: "#1F2937",
        700: "#1f1f1f",
        800: "#0F0F0F",
      },
      gray: {
        DEFAULT: "#dddddd",
        100: "#D1D5DB",
        200: "#DCDCDC",
        300: "#F4F4F5",
        400: "#F9FAFB",
        500: "#F3F4F6",
        600: "#E5E7EB",
        700: "#9CA3AF",
        800: "#777777",
        900: "#A1A1AA",
      },
      blue: {
        DEFAULT: "#151D48",
        100: "#0B1F65",
      },
      green: {
        DEFAULT: "#",
      },
      orange: {
        DEFAULT: "#",
      },
      yellow: {
        DEFAULT: "#",
      },
      red: {
        DEFAULT: "#FFB7B7",
        100: "#FF7F7F",
      },
      other: {
        DEFAULT: "#",
        100: "#",
      },
      error: {
        DEFAULT: "#D34E4E",
        100: "#FF2C2C",
        200: "#FF0000",
      },
      disabled: {
        DEFAULT: "#",
      },
    },
    fontFamily: {
      sans: [
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        '"Noto Sans"',
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
      serif: [
        "ui-serif",
        "Georgia",
        "Cambria",
        '"Times New Roman"',
        "Times",
        "serif",
      ],
      primary: ["Oswald", "sans-serif"],
      secondary: ["Raleway", "sans-serif"],
      inter: ["Inter", "sans-serif"],
      icomoon: ["icomoon"],
    },
  },
  plugins: [
    plugin(function ({ addUtilities, addComponents, e, config }) {
      // Add your custom styles here
      addUtilities({
        html: {
          // "font-size": "62.5%",
          // "scroll-behavior": "smooth",
        },
        ".empty-content": {
          content: "''",
        },
      });
    }),
  ],
};
