import { render, screen, fireEvent, useState } from '@testing-library/react';
import users from '../../data/users.json';
import React from "react";
import SignUpPage from './SignUpPage';
import {BrowserRouter as Router} from 'react-router-dom';


test('check components of sign up page', () => {

  // Mocking useState
  const useStateMock = (users) => [users, jest.fn()];
  jest.spyOn(React, 'useState').mockImplementation(useStateMock);

  render(<Router> <SignUpPage usersList={users} setUsersList={jest.fn()}/> </Router>);
  expect(screen.getByTitle(/Username/i)).toBeInTheDocument();
  expect(screen.getByTitle(/Password/i)).toBeInTheDocument();
  expect(screen.getByTitle(/Confirm/i)).toBeInTheDocument();
  expect(screen.getByTitle(/Nickname/i)).toBeInTheDocument();
  expect(screen.getByTitle(/Picture/i)).toBeInTheDocument();
  expect(screen.getByTitle(/SignUp/i)).toBeInTheDocument();
});

// test('displays error message on password not matches', () => {

//     // Mocking useState with the initial users array
//     // const initialUsers = users;
  
//     const alert = null
//     const strengthMessage = ''
//     const user = {
//       username: '',
//       nickname: '',
//       password: '',
//       confirmPassword: '',
//       profilePicture: '',
//     }
    
//     const stubInitialState = users

//     // Mock useState before rendering your component
//     // jest
//     //   .spyOn(React, 'useState')
//     //   .mockImplementationOnce(() => realUseState(stubInitialState))
    
//     const useStateMock = (users) => [users, jest.fn()];
//     jest.spyOn(React, 'useState').mockImplementation(useStateMock)
//     // .mockReturnValueOnce([alert,  jest.fn()])
//     // .mockReturnValueOnce([strengthMessage,  jest.fn()])
//     // .mockReturnValueOnce([user, jest.fn()])

//     render(
//       <Router>
//         <SignUpPage usersList={stubInitialState} setUsersList={jest.fn()} />
//       </Router>
//     );

//   // render(<Router> <SignUpPage usersList={users} setUsersList={jest.fn()}/> </Router>);
//   const usernameInput = screen.getByTitle(/username/i);
//   const nicknameInput = screen.getByTitle(/nickname/i);
//   const passwordInput = screen.getByTitle(/password/i);
//   const confirmPasswordInput = screen.getByTitle(/confirm/i);  
//   const profilePic = screen.getByTitle(/picture/i);
//   const signupBtn = screen.getByRole('button', { name: /sign up/i });

//   // Enter incorrect credentials
//   fireEvent.change(usernameInput, { target: { value: 'user' }});
//   fireEvent.change(nicknameInput, { target: { value: 'user' } });
//   fireEvent.change(passwordInput, { target: { value: '1q2w3e$r' } });
//   fireEvent.change(confirmPasswordInput, { target: { value: '1q2w3e4r'} });
//   fireEvent.change(profilePic, { target: {files:[{name:"img1.jpg"}]} } );

//   // Submit the form
//   fireEvent.click(signupBtn);

//   // Check if the error message is displayed
//   const errorMessage = screen.getByText(/confirmed password matches the written password/i);
//   expect(errorMessage).toBeInTheDocument();
// });

// test('displays error message on user exists', () => {

//   render(
//     <Router>
//       <SignUpPage usersList={users} setUsersList={() => null} />
//     </Router>
//   );

//   const usernameInput = screen.getByTitle(/username/i);
//   const nicknameInput = screen.getByTitle(/nickname/i);
//   const passwordInput = screen.getByTitle(/password/i);
//   const confirmPasswordInput = screen.getByTitle(/confirm/i);  
//   const profilePic = screen.getByTitle(/picture/i);
//   const signupBtn = screen.getByRole('button', { name: /sign up/i });

//   // Enter incorrect credentials
//   fireEvent.change(usernameInput, { target: { value: 'mike' }});
//   fireEvent.change(nicknameInput, { target: { value: 'mike'} });
//   fireEvent.change(passwordInput, { target: { value: '123'} });
//   fireEvent.change(confirmPasswordInput, { target: { value: '1234' } });
//   fireEvent.change(profilePic, { target: {files:[{name:"img1.jpg"}]} } );

//   // Submit the form
//   fireEvent.click(signupBtn);

//   // Check if the error message is displayed
//   const errorMessage = screen.getByText(/User already exists/i);
//   expect(errorMessage).toBeInTheDocument();
// });