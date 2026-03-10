import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app heading', () => {
  render(<App />);
  const heading = screen.getByText(/E-Commerce Store/i);
  expect(heading).toBeInTheDocument();
});

test('renders navigation links', () => {
  render(<App />);
  const nav = screen.getByRole('navigation');
  expect(nav).toHaveTextContent('Products');
  expect(nav).toHaveTextContent('Orders');
});
