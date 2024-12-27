/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  // Usar prefijos en las clases puede ser útil para evitar conflictos con otras librerías o para encontrar más fácilmente las clases de Tailwind
  prefix: 'cd-',
  theme: {
    extend: {},
  },
  plugins: [],
};
