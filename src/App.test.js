import { render, screen } from '@testing-library/react';
<<<<<<< HEAD
import App from './App.js';
=======
import App from './App';
>>>>>>> e5f0023 (test: update App test to match new branding and add i18n import)
import './i18n/i18n';

test('renders the app without crashing', () => {
  render(<App />);
  const branding = screen.getByText(/DevEmerick/i);
  expect(branding).toBeInTheDocument();
});
