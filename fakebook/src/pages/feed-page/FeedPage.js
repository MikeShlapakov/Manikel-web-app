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

  // console.log("FEED:", token, userId)

  const [user, setUser] = useState([]);

  // const [user, setUser] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const loggedIn = await isLoggedIn(token, userId);
      if (loggedIn.error) {
        console.log(loggedIn.error)
        navigate("/");
        return;
      }
      setUser(await getUserByID(userId));
      console.log("HIiii", user)
    }
    fetchData();
  }, [navigate]);

  async function getAllPosts() {
    const posts = await fetch('http://localhost:8080/api/posts', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'authorization': 'bearer ' + token
        }
    }).then(data => data.json())
    console.log(posts);
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


  const [darkTheme, setDarkTheme] = useState(false);

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

  const handleAddComment = (post, newComments) => {
    // Handle adding comment to the state or perform any desired action
    const updateComments = {
      ...post,
      comments: newComments
    }
    setPostsList(postsList.map((p) => (p.id === updateComments.id ? updateComments : p)))
    setPostComments(updateComments);
  };

  const handleDeleteComment = (post) => {
    // // Handle deleteing comment
    setPostsList(postsList.map((p) => (p.id === post.id ? post : p)))
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

    console.log(newPost)
    
    setPostsList([...postsList, newPost]);
    // console.log(posts)
    setNewPost({content: '', picture: null})
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
            date: new Date()
        })
    }).then(data => data)
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
          content: addPost.content,
          image: addPost.picture
        })
    }).then(data => data.json());
    // console.log(posts)
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

  return (
    <div className={`container-fluid p-2 ${darkTheme ? "container-dark bg-dark" : "bg-light"}`} data-bs-theme={darkTheme ? "dark" : "light"}>
    {/* // <div className={`container-fluid`} style={{ backgroundColor: darkTheme ? 'gray' : 'lightblue'}}> */}
            {/* Offcanvas sidebar */}
      <div title="menu" className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvas" aria-labelledby="offcanvasLabel">
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

      {/* Toggle button for the Offcanvas sidebar */}
      <button className="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvas" aria-controls="offcanvas" >
        <i className="fa fa-bars"></i>
      </button>

      <div className='container'> 
      <nav title="menu" className="navbar navbar-expand-lg justify-content-between bg-body-tertiary p-2">
        <div className="container-fluid">
          <div className="navbar-brand">{user.displayName}<img src={user.pfp} className="card-img-top m-2" style={{ width: '50px', height: '50px' }} /></div>
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
              <div className="dropdown ms-auto">
                  <button class="btn btn-outline-info dropdown-toggle" data-bs-toggle="dropdown">Friend Requests</button>
                  <ul className="dropdown-menu">
                    {/* {console.log("Userrr", user)} */}
                  {user ? (user.friendRequests.map((friend) => (
                      <li>
                      <span className="dropdown-item" onClick={null}>
                      <h5>{friend} <button class="btn btn-outline-success btn-sm"><i className="bi bi-check-lg"/></button>
                      <button class="btn btn-outline-danger btn-sm"><i className="bi bi-x-lg"/></button></h5>
                      </span>
                      </li>
                      ))) : (<li>hi</li>)}
                      {/* <li>
                      <span className="dropdown-item" onClick={null}>
                      <h5>friend <button class="btn btn-outline-success btn-sm"><i className="bi bi-check-lg"/></button>
                      <button class="btn btn-outline-danger btn-sm"><i className="bi bi-x-lg"/></button></h5>
                      </span>
                      </li> */}
                  </ul>
              </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="container">
          <input title="search input" className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
          <button title="search btn" className="btn btn-outline-success me-2" type="submit">Search</button>
        </div>
        <div className="d-flex">
          <button title="back btn" className={`btn btn-outline-${darkTheme ? "light" : "dark"} ml-2`} onClick={backToLogin}>
            Back
          </button>
        </div>
      </nav>

        {/* <div className="container-fluid" style={{ backgroundColor: 'lightblue', maxHeight: '50vh' }}> */}
        <div className="row justify-content-center p-4">
          <div className="col-md-5">
            <div className="p-2 rounded" style={{ maxHeight: '90vh', overflow: 'auto' }}>
          {/* <div className="row justify-content-center pt-4"> */}
            {postsList.reverse().map((post) => (
              <div title="post" key={post._id} className="col-md-4 mb-3">
                <Post token={token} post={post} postsList={postsList} setPostsList={setPostsList} setEditPost={setEditPost} setShowCommentsModal={setShowCommentsModal} setPostComments={setPostComments}/>
              </div>
            ))}
            </div>
            <style>{`
              ::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>
          </div>
        </div> 
      </div>
    </div>

  );
};

export default FeedPage;
