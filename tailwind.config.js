/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    minHeight: {
      body: 'calc(100vh - 64px)',
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
