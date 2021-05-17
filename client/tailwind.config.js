module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"], //remove unused css styles *tree shaking*
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
