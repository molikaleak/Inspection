/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'surface': 'var(--color-surface)',
        'surface-low': 'var(--color-surface-low)',
        'surface-lowest': 'var(--color-surface-lowest)',
        'primary': 'var(--color-primary)',
        'primary-dim': 'var(--color-primary-dim)',
        'on-surface': 'var(--color-on-surface)',
        'on-surface-variant': 'var(--color-on-surface-variant)',
        'emerald-accent': 'var(--color-emerald-accent)',
        'review-amber': 'var(--color-review-amber)',
        'viewed-cyan': 'var(--color-viewed-cyan)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'ambient': 'var(--shadow-ambient)',
        'glow': '0px 0px 20px rgba(16, 185, 129, 0.15)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      }
    },
  },
  plugins: [],
}

