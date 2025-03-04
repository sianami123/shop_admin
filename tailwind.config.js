
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}" // Matches all your component files
  ],
  theme: {
    extend: {
      colors :{ "custom-black" : "#303841" , "custom-gray" : "#3A4750" , "custom-red" :"#D72323" , "custom-white" : "#EEEEEE" }
    },
  },
  plugins: [],
};

