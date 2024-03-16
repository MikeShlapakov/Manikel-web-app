import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {getLoggedInUser, logout, isLoggedIn, getUserByID} from '../../Authentication';
import Post from '../../posts/Post';
// import posts from '../../data/posts.json';
import Comments from '../../posts/Comments';

function FeedPage({token}) {
  // console.log(token, userId)
  const navigate = useNavigate(); 

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('userId');
  const theme = "true" === queryParams.get('theme');

  // console.log("FEED:", token, userId)

  const [user, setUser] = useState([]);

  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const loggedIn = await isLoggedIn(token, userId);
      if (loggedIn.error) {
        console.error("LOGGIN ERROR:", loggedIn.error)
        navigate("/");
        return;
      }

    // Fetch the user data
    const userData = await getUserByID(userId);
    setUser(userData);
    // console.log("HIiii", userData)

    // Fetch friend requests data
    await getFriendRequests(userData);
    }


    fetchData();
  }, [navigate, token, userId]);
  
  
  async function getFriendRequests(userData) {
    // console.log("USER", userData)
    const friendRequestsData = await Promise.all(
      userData.friendRequests.map(friend => getUserByID(friend))
    );
    setFriendRequests(friendRequestsData);
    // console.log("Friesndss", friendRequestsData)
  }

  async function getAllPosts() {
    const posts = await fetch('http://localhost:8080/api/posts/feed/'+ userId, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'authorization': 'bearer ' + token
        },
    }).then(data => data.json())
    // console.log(posts);
    return posts;
  }

  const [postsList, setPostsList] = useState([]);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getAllPosts();
        setPostsList(posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);


  const [darkTheme, setDarkTheme] = useState(theme.boo);

  // useEffect(() => {
  //   setDarkTheme()
  // }, []);

  const [editPost, setEditPost] = useState(null);

  const [addPost, setNewPost] = useState({
    content: '',
    picture: null
  });

  const [showCommentsModal, setShowCommentsModal] = useState(false);

  const [postComments, setPostComments] = useState(null);

  const handleCloseCommentsModal = () => {
    setShowCommentsModal(false);
  };

  const handleAddComment = async (post, newComments) => {
    const posts = await fetch('http://localhost:8080/api/users/' + userId + '/posts/' + post._id, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            'authorization': 'bearer ' + token
        },
        body: JSON.stringify({
          ...post,
          comments: newComments,
        })
    })
    const updateComments = {...post, comments: newComments}
    setPostsList(await getAllPosts());
    setPostComments(updateComments);
  };

  const handleDeleteComment = async (post) => {
    const posts = await fetch('http://localhost:8080/api/users/' + userId + '/posts/' + post._id, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
          'authorization': 'bearer ' + token
      },
      body: JSON.stringify({
        ...post,
      })
  })
    // // Handle deleteing comment
    setPostsList(await getAllPosts());
    setPostComments(post);
  };

  const handleChange = (e) => {
    const { id, value, type } = e.target;
    if (type === 'file') {
      const file = e.target.files[0];
      const reader = new FileReader();
  
      reader.onloadend = () => {
        setNewPost((prevData) => ({
          ...prevData,
          [id]: reader.result,
        }));
      };
  
      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      const { value } = e.target;
      setNewPost((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  const checkEmptyPost = () => {
    if(addPost.content === '' ||
      addPost.picture === null){
        return true;
      }
    return false;
  };

  const handleAddPost = async (e) => {
    e.preventDefault();
    if(checkEmptyPost()){
      return;
    }

    const newPost = await createPost()

    // console.log(newPost)
    
    // console.log(posts)
    setNewPost({content: '', picture: null})
    setPostsList(await getAllPosts());

  };

  // POSTS //
  async function createPost() {
    const post = await fetch('http://localhost:8080/api/users/'+ userId +'/posts', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'authorization': 'bearer ' + token
        },
        body: JSON.stringify({
            content: addPost.content,
            image: addPost.picture,
            date: new Date(),
            authorPfp: user.pfp,
            authorDisplayName: user.displayName,
        })
    })
    return post
}

  const handleEditPost = async (e) => {
    e.preventDefault();
    if(checkEmptyPost()){
      return;
    }

    await edit();

    setPostsList(await getAllPosts());

    setEditPost(null);
  };

  async function edit() {
    const posts = await fetch('http://localhost:8080/api/users/' + userId + '/posts/' + editPost._id, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            'authorization': 'bearer ' + token
        },
        body: JSON.stringify({
          ...editPost,
          content: addPost.content,
          image: addPost.picture
        })
    }).then(data => data.json());
  }

  const backToLogin = () => {
    logout()
    navigate("/")
  };

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const handleClose = () => {
    setEditPost(null);
  };

  // const sortedPosts = posts.slice().sort((a, b) => {
  //   return new Date(b.createdAt) - new Date(a.createdAt);
  // });

  // const handleAcceptFriendRequest = (friendId) => {
  //   acceptFriendRequest(friendId);
  // };

  async function acceptFriendRequest(friendId) {
    try{
      const response = await fetch('http://localhost:8080/api/users/' + userId + '/friends/' + friendId, {
          method: "PATCH",
          headers: {
              "Content-Type": "application/json",
              'authorization': 'bearer ' + token
          },
      })
      // Check if the deletion was successful
      if (response.ok) {
        // Fetch the updated user data from the server
        const updatedUserData = await getUserByID(userId);
  
        // Update the user state with the updated user data
        setUser(updatedUserData);
  
        // Fetch the updated friend requests data
        await getFriendRequests(updatedUserData);
      } else {
        console.error("Failed to accept friend request:", response.status);
      }
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  }

  // const handleDeleteFriendRequest = (friendId) => {
  //   deleteFriendRequest(friendId);
  // };

  async function deleteFriendRequest(friendId) {
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
  
        // Fetch the updated friend requests data
        await getFriendRequests(updatedUserData);
      } else {
        console.error("Failed to delete friend request:", response.status);
      }
    } catch (error) {
      console.error("Error deleting friend request:", error);
    }
  }

  return (
    <div className={`container-fluid ${darkTheme ? "container-dark bg-dark text-light" : "bg-light"}`} data-bs-theme={darkTheme ? "dark" : "light"}>

      <div className="justify-content-center align-items-center" style={{width:"100%", margin:"0 auto"}}>
        <nav title="menu" className="navbar navbar-expand-sm justify-content-between bg-body-tertiary px-2" style={{width:"100%", margin:"0 auto", boxShadow: "0 5px 0 rgb(0,0,0,0.05)", }}>
          <div className="container-fluid">
            <button className="btn btn-lg" type="button" data-bs-toggle="offcanvas" data-bs-target="#menuOffcanvas" aria-controls="offcanvas" >
              <i className="fa fa-bars"></i>
            </button>
            <div className="navbar-brand"><img src={user.pfp} className="card-img-top m-2" style={{ width: '50px', height: '50px', borderRadius: "10px" }} />{user.displayName}</div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse w-100" id="navbarSupportedContent">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item me-2">
                  <button title="add post" className={`btn btn-outline-${darkTheme ? "light" : "dark"} ml-2`} data-bs-toggle="modal" data-bs-target="#addPost">
                      Add post
                  </button>
                </li>
                <li className="nav-item me-2">
                  <button title="theme" className={`btn btn-outline-${darkTheme ? "light" : "dark"} ml-2`} onClick={toggleTheme}>
                      {darkTheme ? 'Light Theme' : 'Dark Theme'}
                  </button>
                </li>
                <li className="nav-item me-2">
                
                </li>
                <li className="nav-item me-2">
                  <input title="search input" className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                </li>
                <button title="search btn" className="btn btn-outline-success me-2" type="submit">Search</button>
                </ul>
            </div>
          </div>
          <div className="d-flex">
            <button title="back btn" className={`btn btn-outline-${darkTheme ? "light" : "dark"} ml-2`} onClick={backToLogin}>
              Back
            </button>
          </div>
        </nav>
        <div className="d-flex flex-row" style={{width:"100%", margin:"0 auto"}}>
          <div className="d-flex flex-column align-items-center px-5 py-2" style={{backgroundColor: `${darkTheme ? "#1B1B1B" : "#DDEEFF "}`, maxHeight: '90vh', overflow: 'auto', width: '80%', margin:"0 auto"}}>
          {postsList.reverse().map((post) => (
            <div title="post" key={post._id} className="col-md-5 mb-3 justify-content-center">
              <Post token={token} post={post} setPostsList={setPostsList} setEditPost={setEditPost} setShowCommentsModal={setShowCommentsModal} setPostComments={setPostComments}/>
            </div>
          ))}
          </div>
          <style>{`
              ::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>
          <div className="d-flex flex-column align-items-center text-center pt-2" style={{width: '15%', margin:"0 auto", overflow: 'auto'}}>
            <h5>Friend Requests</h5>
            <div className="body">
              <ul className="list-group">
                {friendRequests.length ? (
                  friendRequests.map((friend) => (
                    <li className="list-group-item" key={friend._id}>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <img src={friend.pfp} className="rounded-circle me-2" style={{ width: '30px', height: '30px' }} alt={friend.displayName} />
                          <span>{friend.displayName}</span>
                        </div>
                        <div>
                          <button className="btn btn-outline-success btn-sm me-2" onClick={() => acceptFriendRequest(friend._id)}>
                            <i className="bi bi-check-lg" />
                          </button>
                          <button className="btn btn-outline-danger btn-sm" onClick={() => deleteFriendRequest(friend._id)}>
                            <i className="bi bi-x-lg" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="list-group-item">No Requests Yet</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div> 
      
      <div title="menu" className="offcanvas offcanvas-start" tabIndex="-1" id="menuOffcanvas" aria-labelledby="offcanvasLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasLabel">Menu</h5>
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <ul className='navbar-nav'>
            <li className="nav-item mb-2">          
              <button title="add post" className={`btn btn-outline-${darkTheme ? "light" : "dark"} ml-2`} data-bs-toggle="modal" data-bs-target="#addPost">
                Add Post
              </button>
            </li>
            <li className="nav-item mb-2">
              <input title="search input" type="text" className="form-control" placeholder="Search" /></li>
            <li className="nav-item mb-2">
              <button title="search btn" className="btn btn-outline-success m-auto" type="submit">Search</button></li>
            <li className="nav-item mb-2">
            <button title="theme" className="btn btn-warning mt-2" onClick={toggleTheme}>
              {darkTheme ? 'Light Theme' : 'Dark Theme'}
            </button>
            </li>
            <li className="nav-item mb-2">
              <button title="back btn" className={`btn btn-outline-${darkTheme ? "light" : "dark"} ml-2`} onClick={backToLogin}>
                  Back
              </button>
            </li>
          </ul>
        </div>
      </div>


      <div className="modal fade" id="addPost" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">New Post</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="col-form-label">Message:</label>
                  <textarea className="form-control" id="content" title="content" onChange={handleChange} required></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Add Picture:</label>
                  <input type="file" className="form-control" id="picture" title="picture" accept="image/*" onChange={handleChange} required/>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cencel</button>
              <button type="button" className="btn btn-primary"  data-bs-dismiss="modal" title="confirmAdd" onClick={handleAddPost}>Add Post</button>
            </div>
          </div>
        </div>
      </div>

      <div className={`modal ${editPost ? 'fade show' : 'fade'}`} style={{ display: editPost ? 'block' : 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Post</h1>
              <button type="button" className="btn-close" onClick={handleClose}></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="col-form-label">Message:</label>
                  <textarea className="form-control" id="content" onChange={handleChange} required></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Add Picture:</label>
                  <input type="file" className="form-control" id="picture" name="profilePicture" accept="image/*" required onChange={handleChange}  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleClose}>Cencel</button>
              <button type="button" className="btn btn-primary" onClick={handleEditPost}>Edit Post</button>
            </div>
          </div>
        </div>
      </div>

      <Comments
        show={showCommentsModal}
        handleClose={handleCloseCommentsModal}
        addComment={handleAddComment}
        deleteComment={handleDeleteComment}
        post={postComments}
      />
    </div>
          
  );
};

export default FeedPage;
