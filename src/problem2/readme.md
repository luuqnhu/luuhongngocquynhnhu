# Currency Swap Form #

This project is a responsive, interactive, and visually appealing Currency Swap Form that allows users to swap assets between different currencies. The form includes token images, price fetching, and input validation to ensure a smooth and intuitive user experience.

# Live code #
Check at: https://codesandbox.io/p/sandbox/currency-swap-9qjrrh

# Live Demo #
Check at: https://9qjrrh.csb.app/

# Technology Stack #
	•	Frontend Framework: React.js (with TypeScript)
	•	Styling: Tailwind CSS / Flowbite React Component for responsive and modern UI design
	•	HTTP Client: Axios for API calls

# Usage #
	1.	Swap Assets
	    •	Select a token to swap from and a token to swap to using dropdown menus populated with supported tokens.
	    •	Enter the amount to swap in the input field.
	2.	Validation and Feedback
	    •	Ensures users cannot perform invalid swaps.
	    •	Displays error messages for invalid amount.

# Folder Structure

- **public/**  
  - `index.html` — Root HTML file

- **src/**  
  - **api/** — API call files  
  - **assets/** — Icons folder  
  - **components/** — Reusable React components  
  - **types/** — Interface & type definitions  
  - **utils/** — Helper functions  
  - `App.tsx` — Root React component

- `README.md` — Project documentation  
- `package.json` — Project configuration  
- `tsconfig.json` — TypeScript configuration

# API Information #
Token Prices API
Endpoint: https://interview.switcheo.com/prices.json
