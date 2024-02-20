// import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { useState } from "react";
import users from './data/users';
import LoginPage from './pages/login-page/LoginPage';
import FeedPage from './pages/feed-page/FeedPage';
import SignUpPage from './pages/signup-page/SignUpPage';

function App() {
  const [usersList, setUsersList] = useState(users);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage usersList={usersList}/>} />
        <Route path="/signup" element={<SignUpPage usersList={usersList} setUsersList={setUsersList}/>} />
        <Route path="/feed" element={<FeedPage usersList={usersList}/>} />
      </Routes>
    </Router>
  );
}

export default App;
