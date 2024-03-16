// import { useEffect } from 'react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getUserByID, getUserPosts } from '../../Authentication';
import Post from '../../posts/Post';

const FriendPostsPage = ({token}) => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('userId');
  const friendId = queryParams.get('friendId');
  const theme = "true" === queryParams.get('theme');

  // console.log(friendId)

  const navigate = useNavigate();

  const [user, setUser] = useState([]);

  const [isFriend, setIsFriend] = useState(false);

  // console.log("1", user);
  useEffect(() => {
    // console.log("2", user);
    const fetchPosts = async () => {
      try {
        // console.log("Hiii111", userId);
        let user = await getUserByID(userId);
        setUser(user);
        // console.log("Hiii2222", user);
        let result = user.friends.includes(friendId);
        // console.log("isFriends", result);
        if (result) setIsFriend (true);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const [friend, setFriend] = useState([]);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let user = await getUserByID(friendId);
        setFriend(user);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const [postsList, setPostsList] = useState([]);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getFriendPosts();
        // console.log("HERE POSTS", posts)
        if(posts.error){
          return;
        }
        setPostsList(posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  async function getFriendPosts() {
    const posts = await fetch('http://localhost:8080/api/posts/' + userId +'/friend-posts/'+ friendId , {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'authorization': 'bearer ' + token
        },
    }).then(data => data.json())

    // console.log("POSSTTTS", posts);
    return posts;
    // document.getElementById('getposts2').innerText = JSON.stringify(users);
}

  const backToLogin = () => {
    console.log(darkTheme)
    const queryParams = new URLSearchParams({
      userId: encodeURIComponent(userId),
      theme: darkTheme,
    });
    navigate(`/feed?${queryParams.toString()}`);
  };

  const [darkTheme, setDarkTheme] = useState(theme);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const handleFriendButton = () => {
    toggleRequest();
    isFriend ? deleteFriend() : sendFriendRequest()
  };

  async function sendFriendRequest() {
    await fetch('http://localhost:8080/api/users/' + userId + '/friends',
     {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'authorization': 'bearer ' + token
        },
        body: JSON.stringify({
            fid: friendId,
        })
    })
  }

  const [request, setRequest] = useState(false);

  const toggleRequest = () => {
    setRequest(!request);
  };

  async function deleteFriend() {
    try{
      const response = await fetch('http://localhost:8080/api/users/' + userId + '/friends/' + friendId, {
          method: "DELETE",
          headers: {
              "Content-Type": "application/json",
              'authorization': 'bearer ' + token
          },
      });

      // Check if the deletion was successful
      if (response.ok) {
        // Fetch the updated user data from the server
        const updatedUserData = await getUserByID(userId);
        // Update the user state with the updated user data
        setUser(updatedUserData);

        const posts = await getFriendPosts();
        setPostsList(posts);

        let user = await getUserByID(friendId);
        setFriend(user);

        let result = user.friends.includes(friendId);
        result? setIsFriend(true): setIsFriend(false);

      } else {
        console.error("Failed to delete friend request:", response.status);
      }
    } catch (error) {
      console.error("Error deleting friend request:", error);
    }
  }

  return (
    <div className={`container-fluid p-2 ${darkTheme ? "container-dark bg-dark" : "bg-light"}`}  data-bs-theme={darkTheme ? "dark" : "light"} style={{ minHeight: '100vh' }}>
      <nav title="menu" className="navbar navbar-expand-lg justify-content-between bg-body-tertiary p-2">
        <div className="container-fluid">
          <div className="navbar-brand"><img src={friend.pfp} className="card-img-top m-2" style={{ width: '50px', height: '50px', borderRadius: "10px"}}/>{friend.displayName}</div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse w-100" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item me-2">
                <button title="theme" className={`btn btn-outline-${darkTheme ? "light" : "dark"} ml-2`} onClick={toggleTheme}>
                    {darkTheme ? 'Light Theme' : 'Dark Theme'}
                </button>
              </li>
              <li className="nav-item me-2">
                <button title="theme" className={`btn btn${request ? "": "-outline"}-${isFriend ? "danger" : "primary"} ml-2`} 
                onClick={handleFriendButton}>
                    {isFriend ? 'Delete Friend' : 'Friend Requst'}
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="d-flex">
          <button title="back btn" className={`btn btn-outline-${darkTheme ? "light" : "dark"} ml-2`} onClick={backToLogin}>
            Back
          </button>
        </div>
      </nav>

      <div className="justify-content-center align-items-center" style={{}}>
            <div className="d-flex flex-column align-items-center px-5 py-2" style={{backgroundColor: `${darkTheme ? "#1B1B1B" : "#DDEEFF "}`, maxHeight: '90vh', overflow: 'auto', width: '75%', margin:"0 auto"}}>
        {isFriend? postsList.reverse().map((post) => (
          <div title="post" key={post._id} className="col-md-5 mb-3">
            <Post token={token} post={post} setPostsList={setPostsList} setEditPost={null} setShowCommentsModal={null} setPostComments={null}/>
          </div>)) : 
          (<h1 className="d-flex justify-content-center text-center">
            This user is private.<br/>
            To see their posts you need to be friends.</h1>)
            }
            <style>
              {`
                ::-webkit-scrollbar {
                  display: none;
                }
              `}
            </style>
        </div>
      </div>
    </div>
  );
};

export default FriendPostsPage;