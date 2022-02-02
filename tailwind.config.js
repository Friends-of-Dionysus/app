module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'fod-blue': '#4e4c73',
        'fod-yellow': '#ffd192',
        'fod-green': '#5adbc4',
        'fod-pink': '#ff93d5',
        'fod-dark-bg': '#261c20',
        'fod-button-blue': '#6372ec',
        'fod-red': '#8F3863',
      }
    },
    fontFamily: {
      sans: ['IBM Plex Mono', 'sans-serif'],
      heading: ['Kelly Slab', 'sans-serif']
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
