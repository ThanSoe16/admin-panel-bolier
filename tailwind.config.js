import tailwindcssAnimate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}', // Simplified to just scan the src directory
  ],
  darkMode: ['class', 'class'], // Enable dark mode with a class
  theme: {
    extend: {
      backgroundImage: {
        'splash-bg': 'url(/splash/bg-banner.png)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        default: {
          DEFAULT: '#1E1E1E',
          secondary: '#686868',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          hover: ' #4380ED',
        },
        secondary: {
          DEFAULT: '#F5F8FF',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        success: {
          DEFAULT: '#319300',
          secondary: '#ECFAE6',
        },
        brand: {
          DEFAULT: '#275EE2',
          secondary: '#F0F6FE',
        },
        stroke: {
          secondary: '#C3DAFB',
        },
        placeholder: {
          DEFAULT: '#989898',
          secondary: '#555F6D',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        error: {
          DEFAULT: '#FF1A1A',
          secondary: '#FFE8E8',
        },
        warning: {
          DEFAULT: '#8C7813',
          disabled: '#FFFBE9',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
