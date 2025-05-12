import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./app/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        // Цвета
        colors: {
          primary: { value: "#FAFAFA" },
          secondary: { value: "#F75523" },
          lighter: { value: "#f5802c" },
          dark: { value: "#141414" },
          mainGray: { value: "#ababab" },
        },

        // Рамки
        borders: {
          grayBorder: { value: "1px solid {colors.mainGray}" },
          secondaryBorder: { value: "1px solid {colors.secondary}" },
        },

        // Анимации
        animations: {
          spin: {
            value: "spin 5s linear infinite",
          },
          arise: {
            value: "",
          },
        },

        // Тени
        shadows: {
          around: {
            value: {
              offsetX: 0,
              offsetY: 0,
              blur: 10,
              spread: 5,
              color: "rgba(0, 0, 0, 0.2)",
            },
          },
          secondaryAround: {
            value: {
              offsetX: 0,
              offsetY: 0,
              blur: 10,
              spread: 3,
              color: "{colors.lighter}",
            },
          },
        },
      },
    },

    semanticTokens: {},
  },

  patterns: {
    extend: {},
  },

  // The output directory for your css system
  outdir: "styled-system",
});
