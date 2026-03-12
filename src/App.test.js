import { render, screen } from '@testing-library/react';
<<<<<<< HEAD
import App from './App.js';
=======
import App from './App.js';
>>>>>>> 2f1b78c (feat: analytics and speed insights integration)
import './i18n/i18n';

test('renders the app without crashing', () => {
  render(<App />);
  const branding = screen.getByText(/DevEmerick/i);
  expect(branding).toBeInTheDocument();
});
