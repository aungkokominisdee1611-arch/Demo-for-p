/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
      },
      colors: {
        kiwi: {
          DEFAULT: '#9FE870',
          light: '#B8F090',
          bright: '#7ED957',
          dark: '#5CB83B',
        },
        electric: {
          cyan: '#22D3EE',
          cyanBright: '#00E5FF',
          blue: '#0F172A',
          surface: '#1E293B',
          card: '#1E3A5F',
          deep: '#0C4A6E',
        },
        // Semantic aliases for theme
        theme: {
          bg: '#0F172A',
          surface: '#1E293B',
          card: '#1E3A5F',
          cream: '#F0FDF4',
          muted: '#94A3B8',
          green: '#9FE870',
          cyan: '#22D3EE',
        },
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'glow-kiwi': '0 0 20px rgba(159, 232, 112, 0.3)',
        'glow-cyan': '0 0 20px rgba(34, 211, 238, 0.3)',
      },
    },
  },
  plugins: [],
};
