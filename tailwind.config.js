/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'elegancia-primary': '#D8AE48',
        'elegancia-primary-light': '#E5C26A',
        'elegancia-primary-dark': '#B8923D',
        'elegancia-primary-hover': '#E0B756',
        'elegancia-dark': '#0A0A0A',
        'elegancia-surface': '#121212',
        'elegancia-secondary': '#1C1C1C',
        'elegancia-text-primary': '#FFFFFF',
        'elegancia-text-secondary': '#A0A0A0',
        'elegancia-text-disabled': '#555555',
        'elegancia-border-secondary': '#333333',
        'elegancia-error': '#D32F2F',
        'elegancia-warning': '#FFA000',
        'elegancia-success': '#388E3C',
      },
      fontFamily: {
        'elegancia-heading': ['Cinzel', 'serif'],
        'elegancia-body': ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        'elegancia': '0 2px 4px rgba(0, 0, 0, 0.1)',
        'elegancia-interactive': '0 0 8px rgba(216, 174, 72, 0.5)',
      },
      spacing: {
        'elegancia-xs': '4px',
        'elegancia-sm': '8px',
        'elegancia-md': '16px',
        'elegancia-lg': '32px',
        'elegancia-xl': '64px',
        'elegancia-xxl': '128px',
      },
    },
  },
  plugins: [],
}
