import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { useState } from "react";
import users from './data/users';
import posts from './data/posts.json';
import LoginPage from './pages/login-page/LoginPage';
import FeedPage from './pages/feed-page/FeedPage';
import SignUpPage from './pages/signup-page/SignUpPage';
import FriendPostsPage from './pages/friend-page/FriendPage';

function App() {
  const [usersList, setUsersList] = useState(users);
  const [postsList, setPostsList] = useState(posts);

  const [userId, setUserId] = useState("0");
  const [token, setToken] = useState("0");

    async function editUser() {
        const users = await fetch('http://localhost:8080/api/users/' + document.getElementById('edituser0').value, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: document.getElementById('edituser1').value,
                password: document.getElementById('edituser2').value,
                displayName: document.getElementById('edituser3').value,
                pfp: document.getElementById('edituser4').value
            })
        }).then(data => data.json());
        // console.log(users)
    }

    async function deleteUser() {
        const users = await fetch('http://localhost:8080/api/users/' + document.getElementById('deleteuser1').value, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(data => data.json());
        // console.log(users)
    }

    async function acceptFriendRequest() {
        const users = await fetch('http://localhost:8080/api/users/' + document.getElementById('accept1').value + '/friends/' + document.getElementById('accept2').value, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(data => data.json());
        // console.log(users)
    }

  // console.log(usersList[0])
  // console.log(postsList)
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage token={token} setToken={setToken} setUserId={setUserId}/>} />
        <Route path="/signup" element={<SignUpPage/>} />
        <Route path="/feed" element={<FeedPage token={token}/>} />
        <Route path="/friends" element={<FriendPostsPage token={token}/>}  />
      </Routes>
    </Router>
  );
}

export default App;
