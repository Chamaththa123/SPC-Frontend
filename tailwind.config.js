import withMT from "@material-tailwind/react/utils/withMT";
import defaultTheme from "tailwindcss/defaultTheme";
import typography from "@tailwindcss/typography";
import scrollbarHide from "tailwind-scrollbar-hide";

export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        nunito: ["Nunito Sans", "sans-serif"],
      },
      colors: {
        "bottom-border": "#FFFFFF03",
        "theme-color": "#461058",
        "theme-title": "#C38ED1",
      },
      screens: {
        "3xl": "1400px",
        ...defaultTheme.screens,
      },
      boxShadow: {
        "custom-shadow": "0 4px 4px 0 rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [typography, scrollbarHide],
});