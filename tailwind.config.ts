import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				primary: {
					blue: "#0065F5",
				},
				text: {
					primary: "#121217",
					secondary: "#6C6C89",
				},
				background: {
					blue: "#00ACFF",
					neutral: "#F9FAFB",
				},
				border: {
					light: "#EBEBEF",
				},
			},
		},
	},
	plugins: [],
};
export default config;
