/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},

  },
  daisyui: {
    themes: [
      {
        mytheme: {

          // primary: '#22d3ee',
          primary: '#6a47ad',

          secondary: '#F000B8',

          accent: '#065f46',

          neutral: '#3D4451',

          base: '#FFFFFF',

          info: '#3ABFF8',

          success: '#36D399',

          warning: '#fde68a',

          error: '#F87272',

          mecolor: '#67e8f9',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
};
