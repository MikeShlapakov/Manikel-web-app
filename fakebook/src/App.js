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

  const [token, setToken] = useState("");
  let TOKEN = ""
    async function getUserByID() {
        const users = await fetch('http://localhost:8080/api/users/' + document.getElementById('getuser0').value, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }).then(data => data.json())

        // console.log(users);
        document.getElementById('getuser1').innerText = JSON.stringify(users);
    }

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

    // POSTS //
    async function createPost() {
        const post = await fetch('http://localhost:8080/api/users/'+ document.getElementById('createpost3').value +'/posts', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'authorization': 'bearer ' + TOKEN
            },
            body: JSON.stringify({
                content: document.getElementById('createpost1').value,
                image: document.getElementById('createpost2').value,
                date: new Date()
            })
        }).then(data => data.json())
    }

    async function getAllPosts() {
        const posts = await fetch('http://localhost:8080/api/posts', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'authorization': 'bearer ' + TOKEN
            }
        }).then(data => data.json())

        console.log(posts);
        document.getElementById('getallposts1').innerText = JSON.stringify(posts);
    }

    async function getUserPosts() {
        const users = await fetch('http://localhost:8080/api/users/' + document.getElementById('getposts1').value +'/posts' , {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'authorization': 'bearer ' + TOKEN
            },
        }).then(data => data.json())

        console.log(users);
        document.getElementById('getposts2').innerText = JSON.stringify(users);
    }

    async function editPost() {
        const posts = await fetch('http://localhost:8080/api/users/' + document.getElementById('editpost3').value + '/posts/' + document.getElementById('editpost0').value, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                'authorization': 'bearer ' + TOKEN
            },
            body: JSON.stringify({
                content: document.getElementById('editpost1').value,
                image: document.getElementById('editpost2').value,
            })
        }).then(data => data.json());
        // console.log(posts)
    }

    async function deletePost() {
        const posts = await fetch('http://localhost:8080/api/users/' + document.getElementById('deletepost3').value + '/posts/' + document.getElementById('deletepost0').value, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'authorization': 'bearer ' + TOKEN
            },
        }).then(data => data.json());
        // console.log(posts)
    }


    // FRIENDS //
    async function getFriends() {
        const friends = await fetch('http://localhost:8080/api/users/' + document.getElementById('getfriends1').value + '/friends', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }).then(data => data.json())

        console.log(friends);
        document.getElementById('getfriends2').innerText = JSON.stringify(friends);
    }

    async function sendFriendRequest() {
        const users = await fetch('http://localhost:8080/api/users/' + document.getElementById('send1').value + '/friends',
         {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fid: document.getElementById('send2').value,
            })
        }).then(data => data.json())
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

    async function deleteFriendRequest() {
      const users = await fetch('http://localhost:8080/api/users/' + document.getElementById('delete1').value + '/friends/' + document.getElementById('delete2').value, {
          method: "DELETE",
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
        <Route path="/" element={<LoginPage token={token} setToken={setToken}/>} />
        <Route path="/signup" element={<SignUpPage/>} />
        <Route path="/feed" element={<FeedPage usersList={usersList}/>} />
        <Route path="/friend" element={<FriendPostsPage friend={usersList[0]} posts={postsList}/>} />
      </Routes>
    </Router>
  );
}

export default App;
