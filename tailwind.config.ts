import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        "purple-dark": {
          extend: "dark", // <- inherit default values from dark theme
          colors: {
            background: "#0D001A",
            foreground: "#ffffff",
            colors: {
              primary: {
                100: "#F8D6FF",
                200: "#EDADFF",
                300: "#DC84FF",
                400: "#CB66FF",
                500: "#AE33FF",
                600: "#8825DB",
                700: "#6619B7",
                800: "#481093",
                900: "#33097A",
                DEFAULT: "#AE33FF",
              },
              success: {
                100: "#F5FDD2",
                200: "#E8FBA6",
                300: "#D4F579",
                400: "#BFEC56",
                500: "#A1E023",
                600: "#83C019",
                700: "#67A111",
                800: "#4E810B",
                900: "#3C6B06",
                DEFAULT: "#A1E023",
              },
              info: {
                100: "#CEF2FF",
                200: "#9DE0FF",
                300: "#6DC9FF",
                400: "#48B3FF",
                500: "#0C8DFF",
                600: "#086DDB",
                700: "#0651B7",
                800: "#033993",
                900: "#02287A",
                DEFAULT: "#0C8DFF",
              },
              warning: {
                100: "#FFFAD7",
                200: "#FFF4AF",
                300: "#FFED87",
                400: "#FFE669",
                500: "#FFDA38",
                600: "#DBB628",
                700: "#B7941C",
                800: "#937411",
                900: "#7A5D0A",
                DEFAULT: "#FFDA38",
              },
              danger: {
                100: "#FFE3D9",
                200: "#FFC0B3",
                300: "#FF968D",
                400: "#FF7172",
                500: "#FF4255",
                600: "#DB3051",
                700: "#B7214B",
                800: "#931544",
                900: "#7A0C3F",
                DEFAULT: "#FF4255",
              },
              focus: "#F182F6",
            },
            layout: {
              disabledOpacity: "0.3",
              radius: {
                small: "4px",
                medium: "6px",
                large: "8px",
              },
              borderWidth: {
                small: "1px",
                medium: "2px",
                large: "3px",
              },
            },
          },
        },
      },
    }),
  ],
};
export default config;
