// import { useEffect } from 'react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getUserByID, getUserPosts } from '../../Authentication';
import Post from '../../posts/Post';

const FriendPostsPage = ({token}) => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('userId');
  const friendID = queryParams.get('friendId');

  // console.log(friendID)

  const navigate = useNavigate();

  const [user, setUser] = useState([]);

  const [isFriend, setIsFriend] = useState(false);

  // console.log("1", user);
  useEffect(() => {
    // console.log("2", user);
    const fetchPosts = async () => {
      try {
        console.log("Hiii111", userId);
        let user = await getUserByID(userId);
        setUser(user);
        console.log("Hiii2222", user);
        let result = user.friends.find(user => user._id === friend.id);
        console.log("isFriends", result);
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
        let user = await getUserByID(friendID);
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
        const posts = await getUserPosts(token, friendID);
        console.log("HERE POSTS", posts)
        setPostsList(posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const backToLogin = () => {
    const queryParams = new URLSearchParams({
      userId: encodeURIComponent(userId),
    });
    navigate(`/feed?${queryParams.toString()}`);
  };

  const [darkTheme, setDarkTheme] = useState(false);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };
  // // console.log(posts)
  // const sortedPosts = postsList.slice().sort((a, b) => {
  //   return new Date(b.createdAt) - new Date(a.createdAt);
  // });



  useEffect(() => {
    console.log("user", user);
    console.log("friends", user.friends);

  }, [false]);

  const handleFriendButton = () => {
    isFriend ? deleteFriendRequest() : sendFriendRequest()
  };

  async function sendFriendRequest() {
    const users = await fetch('http://localhost:8080/api/users/' + userId + '/friends',
     {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            fid: friendID,
        })
    }).then(data => console.log(data))
  }

  async function deleteFriendRequest() {
    const users = await fetch('http://localhost:8080/api/users/' + userId + '/friends/' + friendID, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(data => data.json());
    // console.log(users)
}

  return (
    <div className={`container-fluid p-2 ${darkTheme ? "container-dark bg-dark" : "bg-light"}`}  data-bs-theme={darkTheme ? "dark" : "light"} style={{ minHeight: '100vh' }}>
      <nav title="menu" className="navbar navbar-expand-lg justify-content-between bg-body-tertiary p-2">
        <div className="container-fluid">
          <div className="navbar-brand">{friend.displayName}<img src={friend.pfp} className="card-img-top m-2" style={{ width: '50px', height: '50px' }} /></div>
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
                <button title="theme" className={`btn btn-outline-${isFriend ? "danger" : "primary"} ml-2`} 
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
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="p-4 rounded" style={{ maxHeight: '120vh', overflow: 'auto' }}>
          {isFriend? postsList.reverse().map((post) => (
              <div title="post" key={post._id} className="col-md-4 mb-3">
                <Post token={token} post={post} postsList={postsList} setPostsList={setPostsList} setEditPost={null} setShowCommentsModal={null} setPostComments={null}/>
              </div>)) : 
              (<div title="post" className="col mb-3">
                <h1>This user is private.<br></br>
                  To see posts you need to be friends 
                </h1>
                </div>)}
        </div>
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
    // <div>
    //   <div>
    //     <img src={friend.profilePicture} alt={`${friend.name}'s Profile`} />
    //     <h2>{friend.name}</h2>
    //     <button onClick={handleBackClick}>Back</button>
    //   </div>
    //   <div>
    //     {sortedPosts.map((post) => (
    //       <div key={post.id}>
    //         <h3>{post.title}</h3>
    //         <p>{post.content}</p>
    //         <p>Posted on: {new Date(post.createdAt).toLocaleString()}</p>
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
};

export default FriendPostsPage;