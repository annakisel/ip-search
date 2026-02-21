# IP Lookup

A React application for looking up IP addresses and retrieving geographic information including country and timezone data.

## About

This project allows users to:
- Enter one or more IP addresses
- Retrieve country and timezone information for each IP
- Display country flags and local time in the IP's timezone
- Validate IP addresses in real-time

Built with React + TypeScript, Webpack, and tested with Jest + React Testing Library.

## Scripts

- `npm start` — Start the development server
- `npm run build` — Build the production bundle
- `npm test` — Run the Jest unit test suite (React Testing Library)

## Demo

https://github.com/user-attachments/assets/6524b321-ea12-4633-acd1-dec3814ba268

## Usage

1. Install dependencies:
   ```sh
   npm install
   ```
2. Create a `.env` file in the project root with your IP‑API token:
   ```env
   IP_API_TOKEN=your_token_here
   ```
   You must sign up at https://ip-api.in and generate a free API key (token) on your account dashboard. Copy it into the `.env` file so the app can authenticate requests.
3. Start the development server:
   ```sh
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `src/` — React source code
- `public/` — HTML template
- `webpack.config.js` — Webpack configuration
- `.babelrc` — Babel configuration
