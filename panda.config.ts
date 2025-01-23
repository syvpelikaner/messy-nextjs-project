import { defineConfig, defineTextStyles } from "@pandacss/dev";

const textStyles = defineTextStyles({
  md: {
    value: {
      fontFamily: "var(--font-inter)",
      fontSize: "1rem",
      fontWeight: "400",
    },
  },
  lg: {
    value: {
      fontFamily: "var(--font-poppins)",
      fontSize: "2rem",
      fontWeight: "700",
    },
  },
});

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      semanticTokens: {
        colors: {
          background: {
            value: { base: '{colors.white}', _osDark: '{colors.gray.900}' },
          },
          text: {
            value: { base: '{colors.black}', _osDark: "{colors.white}" },
          },
          border: {
            value: { base: '{colors.gray.300}', _osDark: '{colors.gray.600}' },
          },
          primary: {
            value: { base: '{colors.blue.500}', _osDark: '{colors.blue.400}' },
          },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
});
