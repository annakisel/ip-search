# React + Webpack Project

This is a minimal React project bootstrapped with Webpack and Babel.

## Scripts

- `npm start` — Start the development server
- `npm run build` — Build the production bundle

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
