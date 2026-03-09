import { render, screen } from '@testing-library/react';
<<<<<<< HEAD
<<<<<<< HEAD
import App from './App.js';
=======
import App from './App';
>>>>>>> e5f0023 (test: update App test to match new branding and add i18n import)
=======
import App from './App.js';
>>>>>>> 2e2914c (fix: add .js/.jsx extensions to ALL local imports for Vercel ES modules compatibility)
import './i18n/i18n';

test('renders the app without crashing', () => {
  render(<App />);
  const branding = screen.getByText(/DevEmerick/i);
  expect(branding).toBeInTheDocument();
});
