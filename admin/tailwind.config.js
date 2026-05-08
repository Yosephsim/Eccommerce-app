/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ✅ ይህ መስመር በ src ውስጥ ያሉትን ፋይሎች በሙሉ እንዲያነብ ያደርገዋል
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}