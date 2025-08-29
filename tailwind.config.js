/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          700: '#26a69a',
          800: '#00897b',
          900: '#00695c',
        },
        orange: {
          500: '#ff6f00',
          600: '#e65100',
        },
        green: {
          500: '#4caf50',
          700: '#2e7d32',
        },
      },
      fontFamily: {
        pixel: ['Press Start 2P', 'monospace'],
      },
    },
  },
  plugins: [],
}