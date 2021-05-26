module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"], //remove unused css styles *tree shaking*
  variants: {
    extend: {},
  },
  plugins: [],
  theme: {
    colors: {
      // Configure your color palette here
      error: {
        DEFAULT: "#FF0000B2",
      },
      shadow: {
        DEFAULT: "#30303033",
      },
      BgColor: {
        primary: "#C7B0C7",
        secondary: "#A6C4C7",
        tertiary: "#5A91AA",
      },
      text: {
        primary: " #405B8A",
        secondary: "#464346",
        tertiary: "#133F53",
      },
      "th-primary": "var(--primary)",
      "th-secondary": "var(--secondary)",
    },
  },
};
