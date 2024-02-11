import { render, screen } from '@testing-library/react';
import SignUpPage from './SignUpPage';
// import LoingPage from './LoginPage';


test('check components of sign up page', () => {
  render(<SignUpPage />);
  expect(screen.getByTitle(/Username/i)).toBeInTheDocument();
  expect(screen.getByTitle(/Password/i)).toBeInTheDocument();
  expect(screen.getByTitle(/Verification/i)).toBeInTheDocument();
  expect(screen.getByTitle(/Nickname/i)).toBeInTheDocument();
  expect(screen.getByTitle(/Pictutre/i)).toBeInTheDocument();
  expect(screen.getByTitle(/SignUp-btn/i)).toBeInTheDocument();
});