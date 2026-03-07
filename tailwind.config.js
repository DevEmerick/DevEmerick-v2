/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'mobile': '360px',      // Mobile 360 x 640
      'mobile-lg': '390px',   // Mobile grande 390 x 844
      'tablet': '768px',      // Tablet 768 x 1024
      'laptop': '1366px',     // Laptop 1366 x 768
      'desktop': '1440px',    // Desktop 1440 x 900
      'desktop-lg': '1920px', // Desktop grande 1920 x 1080
    },
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