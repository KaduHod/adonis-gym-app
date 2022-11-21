/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./resources/**/*.{edge, js}"],
  theme: {
    extend: {
      keyframes: {
        hide:{
          '0%':{transform: "translateX(0%)"},
          '100%':{transform: "translateX(-110%)"}
        },
        show:{
          '0%':{transform: "translateX(-110%)"},
          '100%':{transform: "translateX(0%)"}
        }
      },
      animation: {
        'hide':'hide 100ms ease-in-out forwards',
        'show':'show 100ms ease-in-out forwards',
      }
    },
  },
  plugins: [],
}
