/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#05070d',
        'bg-secondary': '#090c14',
        accent: '#4fc8ff',
        gold: '#c9a84c',
        'text-primary': '#f0ece4',
        'text-muted': 'rgba(240,236,228,0.45)',
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        heading: ['Cormorant Garamond', 'Georgia', 'serif'],
        mono: ['DM Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
