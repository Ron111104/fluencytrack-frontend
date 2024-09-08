/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lightPurple: '#3c5fff85', // Slightly transparent
        purple: {
          900: '#3c5fff36',
          700: '#6a0dad',
          800: '#7a5ba1',
        },
        darkBackground: '#7a8bce', // Darker background for contrast
      },
    },
  },
  plugins: [],
};
