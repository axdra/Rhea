/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'splash': "url('/images/bg.jpg')",
        'splash-dark': "url('/images/bg-dark-t.jpg')",
      })
      ,
      boxShadow: {
        'glow': `0            0     60px      rgba(245, 245, 245,0.1),
                 20px         0     80px      rgba(255,0,255,0.1),
                -20px         0     80px      rgba(0,255,255,0.1),
                 20px         0     300px     rgba(255,0,255,0.1),
                -20px         0     300px     rgba(0,255,255,0.1),
                 0            0     50px      rgba(255,255,255,0.1),
                -10px         0     80px      rgba(255,0,255,0.1),
                 10px         0     80px      rgba(0,255,255,0.1);`,
      }
    },
    fontFamily: {
      sans: "Space Grotesk, sans-serif",
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
  ],
}
