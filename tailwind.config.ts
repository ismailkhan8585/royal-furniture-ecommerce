import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'bg-green-100',
    'text-green-700',
    'bg-red-100',
    'text-red-700',
    'bg-yellow-100',
    'text-yellow-700',
    'bg-blue-100',
    'text-blue-700',
    'bg-amber-100',
    'text-amber-700',
    'bg-walnut-100',
    'text-walnut-700',
    'border-l-walnut-500',
    'border-l-gold-500',
    'border-l-green-600',
    'border-l-amber-500',
    'border-l-purple-600',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        urdu: ['var(--font-noto-urdu)', 'Arial', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'Consolas', 'monospace'],
      },
      colors: {
        walnut: {
          50: 'rgb(250 247 242)',
          100: 'rgb(237 227 213)',
          200: 'rgb(215 195 169)',
          300: 'rgb(184 154 117)',
          400: 'rgb(140 102 68)',
          500: 'rgb(92 58 33)',
          600: 'rgb(74 46 26)',
          700: 'rgb(56 35 20)',
          800: 'rgb(38 24 14)',
          900: 'rgb(28 20 16)',
          950: 'rgb(20 14 10)',
        },
        silver: {
          50: 'rgb(250 250 250)',
          100: 'rgb(245 245 245)',
          200: 'rgb(230 230 230)',
          300: 'rgb(212 212 212)',
          400: 'rgb(165 165 165)',
          500: 'rgb(192 192 192)',
          600: 'rgb(140 140 140)',
          700: 'rgb(115 115 115)',
          800: 'rgb(80 80 80)',
          900: 'rgb(60 60 60)',
        },
        gold: {
          50: 'rgb(255 251 235)',
          100: 'rgb(254 243 199)',
          200: 'rgb(253 224 139)',
          300: 'rgb(252 202 80)',
          400: 'rgb(212 160 23)',
          500: 'rgb(184 134 11)',
          600: 'rgb(146 107 9)',
          700: 'rgb(116 85 7)',
          800: 'rgb(92 67 6)',
          900: 'rgb(76 56 5)',
        },
        surface: {
          DEFAULT: 'rgb(255 255 255)',
          secondary: 'rgb(250 247 242)',
          tertiary: 'rgb(237 227 213)',
          border: 'rgb(229 221 211)',
          borderHover: 'rgb(215 195 169)',
        },
        success: 'rgb(16 185 129)',
        warning: 'rgb(245 158 11)',
        error: 'rgb(220 38 38)',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
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
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-pattern':
          'linear-gradient(to right, rgb(28 20 16), rgb(56 35 20))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'fade-in': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'slide-in-right': {
          '0%': {
            transform: 'translateX(100%)',
          },
          '100%': {
            transform: 'translateX(0)',
          },
        },
        'pulse-gentle': {
          '0%, 100%': {
            transform: 'scale(1)',
          },
          '50%': {
            transform: 'scale(1.05)',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-in-right': 'slide-in-right 0.3s ease-out',
        'pulse-gentle': 'pulse-gentle 2s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
