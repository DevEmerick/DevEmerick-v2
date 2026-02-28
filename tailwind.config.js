/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      animation: {
        // 1.5s para uma piscada mais lenta, step-end para o efeito seco do VS Code
        blink: 'blink 1.5s step-end infinite',
      },
    },
  },
  plugins: [],
}