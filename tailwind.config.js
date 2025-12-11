/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      colors: {
        neon: {
          pink: '#ff5cf4',
          green: '#5dff9f',
          blue: '#6ddbee',
          purple: '#a264ff',
        },
        base: {
          dark: '#05060a',
          charcoal: '#0f111a',
          muted: '#5e6375',
        },
      },
      boxShadow: {
        glow: '0 8px 40px rgba(93, 255, 159, 0.45)',
      },
      backgroundImage: {
        mesh: 'radial-gradient(circle at 20% 20%, rgba(255,92,244,0.18), transparent 40%), radial-gradient(circle at 80% 0%, rgba(93,255,159,0.25), transparent 40%), radial-gradient(circle at 50% 80%, rgba(109,219,238,0.22), transparent 40%)',
      },
    },
  },
  plugins: [],
};
