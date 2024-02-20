import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from './LoginPage';
import {BrowserRouter as Router} from 'react-router-dom';

test('check components of login page', () => {
    render(<Router> <LoginPage /> </Router>);
    expect(screen.getByTitle(/Username/i)).toBeInTheDocument();
    expect(screen.getByTitle(/Password/i)).toBeInTheDocument();
    expect(screen.getByTitle(/Login-btn/i)).toBeInTheDocument();
});

test('displays error message when user not found', () => {
  render(<Router> <LoginPage /> </Router>);
  const usernameInput = screen.getByTitle(/username/i);
  const passwordInput = screen.getByTitle(/password/i);
  const loginBtn = screen.getByRole('button', { name: /login/i });

  // Enter incorrect credentials
  fireEvent.change(usernameInput, { target: { value: 'InvalidUser'} });
  fireEvent.change(passwordInput, { target: { value: 'InvalidPaswword'} });

  // Submit the form
  fireEvent.click(loginBtn);

  // Check if the error message is displayed
  const errorMessage = screen.getByText(/user not found/i);
  expect(errorMessage).toBeInTheDocument();
});

test('displays warrning message when no input was given', () => {
  render(<Router> <LoginPage /> </Router>);
  const usernameInput = screen.getByTitle(/username/i);
  const passwordInput = screen.getByTitle(/password/i);
  const loginBtn = screen.getByRole('button', { name: /login/i });

  // Enter incorrect credentials
  fireEvent.change(usernameInput, { target: { value: '' } });
  fireEvent.change(passwordInput, { target: { value: '' } });

  // Submit the form
  fireEvent.click(loginBtn);

  // Check if the error message is displayed
  const errorMessage = screen.getByText(/fill out all fields/i);
  expect(errorMessage).toBeInTheDocument();
});
