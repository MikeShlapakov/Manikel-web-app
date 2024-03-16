import { render, screen, fireEvent } from '@testing-library/react';
import usersList from '../../data/users.json';
import FeedPage from './FeedPage';
import {BrowserRouter as Router} from 'react-router-dom';
import { login } from '../../Authentication';


test('check components of feed page', () => {
  render(<Router> <FeedPage usersList={usersList} /> </Router>);
  expect(screen.getAllByTitle(/Post/i).length).toBeGreaterThan(0);
  expect(screen.getAllByTitle(/Menu/i)).toHaveLength(2);
  expect(screen.getAllByTitle(/Search/i)).toHaveLength(4);
  expect(screen.getAllByTitle(/Add Post/i)).toHaveLength(2);
  expect(screen.getAllByTitle(/Theme/i)).toHaveLength(2);
  expect(screen.getAllByTitle(/Back/i)).toHaveLength(2);
});

test('check if added new post', () => {
  login({usersList}, "mike", "123")
  render(<Router> <FeedPage usersList={usersList} /> </Router>);

  const postsLength = screen.getAllByTitle(/post/i).length

  const addPostBtn = screen.getAllByRole('button', { name: /add post/i });
  fireEvent.click(addPostBtn[0]);

  const titleInput = screen.getByTitle(/title/i);
  const contentInput = screen.getByTitle(/content/i);
  const pictureInput = screen.getByTitle(/picture/i);
  const confirmAddPostBtn = screen.getByTitle(/confirmAdd/i);

  // Enter incorrect credentials
  fireEvent.change(titleInput, { target: { value: 'PostTitle' } });
  fireEvent.change(contentInput, { target: { value: 'Postcontent' } });
  fireEvent.change(pictureInput, { target: {files:[{name:"img1.jpg"}]} } );

  // Submit the form
  fireEvent.click(confirmAddPostBtn);

  // Check if the error message is displayed
  expect(screen.getAllByTitle(/post/i)).toHaveLength(postsLength+1);
});

test('check if deleted first post', () => {
  login({usersList}, "mike", "123")
  render(<Router> <FeedPage usersList={usersList} /> </Router>);

  const postsLength = screen.getAllByTitle(/post/i).length

  const deletePostBtn = screen.getAllByTitle(/delete/i);
  fireEvent.click(deletePostBtn[0]);

  // Check if the error message is displayed
  expect(screen.getAllByTitle(/post/i)).toHaveLength(postsLength-1);
});