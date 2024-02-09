import { render, screen } from '@testing-library/react';
import FeedPage from './FeedPage';


test('check components of feed page', () => {
  render(<FeedPage />);
  expect(screen.getByTitle(/Posts/i)).toBeInTheDocument();
  expect(screen.getByTitle(/Menu/i)).toBeInTheDocument();
  expect(screen.getByTitle(/Search/i)).toBeInTheDocument();
  expect(screen.getByTitle(/AddPost-btn/i)).toBeInTheDocument();
  expect(screen.getByTitle(/EditPost-btn/i)).toBeInTheDocument();
  expect(screen.getByTitle(/DeletePost-btn/i)).toBeInTheDocument();
  expect(screen.getByTitle(/AddComment-btn/i)).toBeInTheDocument();
  expect(screen.getByTitle(/Share-btn/i)).toBeInTheDocument();
  expect(screen.getByTitle(/Like-btn/i)).toBeInTheDocument();
  expect(screen.getByTitle(/Theme-btn/i)).toBeInTheDocument();
});
