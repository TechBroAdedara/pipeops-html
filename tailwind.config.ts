import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/page.tsx",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "body": "League Spartan"
      }
    },
  },
  plugins: [],
};
export default config;
