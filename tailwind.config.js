/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#6366f1',
          DEFAULT: '#4f46e5',
          dark: '#4338ca',
        },
        secondary: {
          light: '#ec4899',
          DEFAULT: '#db2777',
          dark: '#be185d',
        },
        background: {
          light: '#ffffff',
          dark: '#030712', // Zinc 950
        },
        surface: {
          light: '#f8fafc',
          dark: '#09090b', // Zinc 900
        },
        text: {
          light: '#0f172a',
          dark: '#f4f4f5', // Zinc 100
        },
        card: {
          light: '#ffffff',
          dark: '#0f172a', // Zinc 900 but slightly elevated
        },
        border: {
          light: '#e2e8f0',
          dark: '#27272a', // Zinc 800
        },
        success: {
          DEFAULT: '#10b981',
          dark: '#059669',
        },
        error: {
          DEFAULT: '#ef4444',
          dark: '#dc2626',
        },
        accent: {
          DEFAULT: '#06b6d4',
          dark: '#0891b2',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      borderRadius: {
        'card': '16px',
        'button': '8px',
        'input': '8px',
      },
      boxShadow: {
        'card-hover': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      },
      scale: {
        '102': '1.02',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
