import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { getLoggedInUser, logout } from '../../Authentication';
import Post from '../../posts/Post';
import posts from '../../data/posts.json'
import Comments from '../../posts/Comments';
import { format } from 'date-fns'

function FeedPage(usersList) {
  // console.log(usersList)
  const navigate = useNavigate(); 

  const [user, setUser] = useState({ id: 1, username:"mike",password:"123",nickname:"mike", img: "img12.jpg"});
  // console.log(user)

  useEffect(() => {
    const loggedInUser = getLoggedInUser();
    if (!loggedInUser) {
      navigate("/");
      return;
    }
    setUser(usersList.usersList.find((user) => user.username === loggedInUser.loggedInUser));
  }, [navigate]);

  const [postsList, setPostsList] = useState(posts);
  
  const [darkTheme, setDarkTheme] = useState(false);

  const [editPost, setEditPost] = useState(null);

  const [addPost, setNewPost] = useState({
    title: '',
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
    setNewPost((prevData) => ({
      ...prevData,
      [id]: type === 'file' ? e.target.files[0].name : value,
    }));
  };

  const checkEmptyPost = () => {
    if(addPost.title === '' ||
      addPost.content === '' ||
      addPost.picture === null){
        return true;
      }
    return false;
  };

  const handleAddPost = (e) => {
    e.preventDefault();
    if(checkEmptyPost()){
      return;
    }
    const newPost= {
      id: Date.now(), // Use a unique identifier (e.g., timestamp) as an ID
      title: addPost.title,
      content: addPost.content, // You might want to use a different field for the nickname
      img: addPost.picture,
      author: user.nickname,
      profile: user.img,
      date:format(Date.now(), "dd/MM/yyyy"),
      comments: [], // Set a default image or provide a way to upload an image
      likes: 0, // Set a default image or provide a way to upload an image
    };
    
    // console.log(newPost)
    setPostsList([...postsList, newPost]);
    // console.log(posts)
    setNewPost({title: '', content: '', picture: null})
  };

  const handleEditPost = (e) => {
    e.preventDefault();
    // Update the state with the modified post
    // console.log(editPost);

    const editedPost = {
      ...editPost,
      title: addPost.title,
      content: addPost.content,
      img: addPost.picture
    };
    // console.log(editPost);

    // Save the modified post to the state
    setPostsList(postsList.map((p) => (p.id === editedPost.id ? editedPost : p)));

    setEditPost(null);
  };

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

  return (
    <div className={`container-fluid pt-2 pb-4 ${darkTheme ? "container-dark bg-dark" : "bg-light"}`} data-bs-theme={darkTheme ? "dark" : "light"}>
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
                  <label className="col-form-label">Title:</label>
                  <input type="text" className="form-control" id="title" title="title" onChange={handleChange} required></input>
                </div>
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
                  <label className="col-form-label">Title:</label>
                  <input type="text" className="form-control" id="title" onChange={handleChange} required></input>
                </div>
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
          <div className="navbar-brand">{user.nickname}<img src={user.img} className="card-img-top m-2" style={{ width: '50px', height: '50px' }} /></div>
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

      <div className="row justify-content-center pt-4">
        {postsList.reverse().map((post) => (
          <div title="post" key={post.id} className="col-md-4 mb-3">
            <Post post={post} postsList={postsList} setPostsList={setPostsList} setEditPost={setEditPost} setShowCommentsModal={setShowCommentsModal} setPostComments={setPostComments}/>
          </div>
        ))}
      </div>
      </div> 
    </div>
  );
};

export default FeedPage;
