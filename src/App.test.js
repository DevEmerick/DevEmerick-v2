import { render, screen } from '@testing-library/react';
import App from './App.js';
import './i18n/i18n';

test('renders the app without crashing', () => {
  render(<App />);
  const branding = screen.getByText(/DevEmerick/i);
  expect(branding).toBeInTheDocument();
});
