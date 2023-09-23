/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        wiggle: 'wiggle 11s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 9.09%, 100%': { transform: 'rotate(0deg)' }, // Image is straight at the start, end of wiggle, and end of the animation cycle
          '2.27%': { transform: 'rotate(-3deg)' }, // Image is at -3deg at 0.25s (0.25s / 11s = 2.27%)
          '4.55%': { transform: 'rotate(3deg)' }, // Image is at 3deg at 0.5s (0.5s / 11s = 4.55%)
          '6.82%': { transform: 'rotate(-3deg)' }, // Image is at -3deg at 0.75s (0.75s / 11s = 6.82%)
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
