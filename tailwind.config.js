module.exports = {
  darkMode: 'media',
  minify: true,
  content: ['./src/**/*.tsx', './*.html'],
  theme: {
    extend: {}
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          primary: "#60A5FA",
          secondary: "#64748B",
          error: "#F87171",
        },
        dark: {
          ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
          primary: "#3B82F6",
          secondary: "#334155",
          error: "#EF4444",
        },
      },
    ],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")]
}
