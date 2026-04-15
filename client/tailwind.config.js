/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-bg)',
        foreground: 'var(--color-text)',
        accent: {
          primary: 'var(--color-accent-primary)',
          secondary: 'var(--color-accent-secondary)',
          glow: 'var(--color-accent-glow)',
        },
        card: {
          bg: 'var(--color-card-bg)',
          border: 'var(--color-card-border)',
        }
      },
      backdropBlur: {
        glass: '12px',
      },
      animation: {
        'neon-glow': 'neon-glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        'neon-glow': {
          '0%': { boxShadow: '0 0 5px var(--color-accent-glow), 0 0 10px var(--color-accent-glow)' },
          '100%': { boxShadow: '0 0 10px var(--color-accent-glow), 0 0 20px var(--color-accent-glow)' },
        }
      }
    },
  },
  plugins: [],
}
