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
                100: "#EED9FF",
                200: "#DAB3FF",
                300: "#C38EFF",
                400: "#AF71FF",
                500: "#8D43FF",
                600: "#6D30DB",
                700: "#5021B7",
                800: "#371593",
                900: "#260C7A",
                DEFAULT: "#8D43FF",
              },
              success: {
                100: "#F1FDD1",
                200: "#E1FBA3",
                300: "#C8F474",
                400: "#AFEA50",
                500: "#8ADD1C",
                600: "#6DBE14",
                700: "#549F0E",
                800: "#3D8008",
                900: "#2D6A05",
                DEFAULT: "#8ADD1C",
              },
              info: {
                100: "#D5FCFF",
                200: "#ABF4FF",
                300: "#81E7FF",
                400: "#61D7FF",
                500: "#2DBCFF",
                600: "#2093DB",
                700: "#166FB7",
                800: "#0E4F93",
                900: "#08387A",
                DEFAULT: "#2DBCFF",
              },
              warning: {
                100: "#FFFBCD",
                200: "#FFF69B",
                300: "#FFF069",
                400: "#FFEA43",
                500: "#FFE105",
                600: "#DBBE03",
                700: "#B79D02",
                800: "#937C01",
                900: "#7A6500",
                DEFAULT: "#FFE105",
              },
              danger: {
                100: "#FFEDD2",
                200: "#FFD5A6",
                300: "#FFB879",
                400: "#FF9C58",
                500: "#FF6E21",
                600: "#DB4F18",
                700: "#B73510",
                800: "#93200A",
                900: "#7A1106",
                DEFAULT: "#FF6E21",
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
