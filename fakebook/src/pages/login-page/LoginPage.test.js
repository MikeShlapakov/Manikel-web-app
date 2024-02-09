import { render, screen } from '@testing-library/react';
import LoginPage from './LoginPage';


test('check components of login page', () => {
  render(<LoginPage />);
  expect(screen.getByTitle(/Username/i)).toBeInTheDocument();
  expect(screen.getByTitle(/Password/i)).toBeInTheDocument();
  expect(screen.getByTitle(/Login-btn/i)).toBeInTheDocument();
});
