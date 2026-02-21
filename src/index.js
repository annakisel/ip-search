// This file is now index.js for a JavaScript-only React project.
// The previous index.jsx has been converted to this file.

const React = require('react');
const { createRoot } = require('react-dom/client');

function App() {
  return React.createElement('h1', null, 'Hello, React + Webpack!');
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(React.createElement(App));
