/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Noto Sans KR', 'sans-serif'],
      },
      colors: {
        primary: '#D32F2F',
        accent: '#FF6B35',
        dark: '#1A1A1A',
        light: '#FAFAFA',
      },
    },
  },
  plugins: [],
}