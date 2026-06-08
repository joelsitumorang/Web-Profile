/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'SF Pro Display',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      colors: {
        'mbg-navy':  '#1B3A5C',
        'mbg-steel': '#4A8DB7',
        'mbg-sky':   '#E8F1F8',
        'mbg-ice':   '#F4F8FB',
        'mbg-deep':  '#0F2640',
        'mbg-gold':  '#D4A843',
      },
    },
  },
  plugins: [],
}
