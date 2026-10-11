/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FAF9F7',
        ink: '#201B2B',
        neon: {
          orange: '#FF5B14',
          'orange-glow': '#FF782D',
          violet: '#7C3AED',
          'violet-glow': '#9055FF',
          pink: '#E1306C',
          purple: '#833AB4'
        },
        dark: {
          bg: '#080711',
          surface: '#110E1F',
          card: '#161228',
          border: 'rgba(255, 255, 255, 0.08)'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'DM Sans', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Manrope', 'sans-serif']
      },
      boxShadow: {
        'neon-orange': '0 0 25px -4px rgba(255, 91, 20, 0.5), 0 0 50px -10px rgba(255, 91, 20, 0.3)',
        'neon-violet': '0 0 25px -4px rgba(124, 58, 237, 0.5), 0 0 50px -10px rgba(124, 58, 237, 0.3)',
        'neon-ig': '0 10px 30px -5px rgba(255, 91, 20, 0.4), 0 10px 30px -5px rgba(124, 58, 237, 0.4)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem'
      }
    }
  },
  plugins: [],
}
