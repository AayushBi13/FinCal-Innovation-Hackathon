import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brandBlue: '#224c87',
        brandRed: '#da3832',
        brandGrey: '#919090',
        ink: '#10233f',
        mist: '#e9eef5',
        surface: '#f7f9fc',
      },
      fontFamily: {
        sans: ['Montserrat', 'Arial', 'Verdana', 'sans-serif'],
      },
      boxShadow: {
        panel: '0 24px 60px rgba(16, 35, 63, 0.12)',
      },
      backgroundImage: {
        'hero-grid': 'radial-gradient(circle at top left, rgba(34, 76, 135, 0.16), transparent 38%), linear-gradient(135deg, rgba(218, 56, 50, 0.08), transparent 35%)',
      },
    },
  },
  plugins: [],
};

export default config;
