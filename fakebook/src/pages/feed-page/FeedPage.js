import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Post from '../../posts/Post';
import posts from '../../data/posts.json'
import { format } from 'date-fns'

function FeedPage() {
  const navigate = useNavigate(); 

  const [postsList, setPostsList] = useState(posts);
  
  const [darkTheme, setDarkTheme] = useState(false);

  const [editPost, setEditPost] = useState(null);

  const [addPost, setNewPost] = useState({
    title: '',
    content: '',
    picture: null,
  });

  const handleChange = (e) => {
    const { id, value, type } = e.target;

    setNewPost((prevData) => ({
      ...prevData,
      [id]: type === 'file' ? e.target.files[0] : value,
    }));
  };

  const handleAddPost = (e) => {
    e.preventDefault();
    
    console.log(Date.now());

    const newPost= {
      id: Date.now(), // Use a unique identifier (e.g., timestamp) as an ID
      title: addPost.title,
      content: addPost.content, // You might want to use a different field for the nickname
      img: addPost.picture,
      author: "mike",
      date:format(Date.now(), "dd-MM-yyyy"),
      comments: [], // Set a default image or provide a way to upload an image
      likes: 0, // Set a default image or provide a way to upload an image
    };
  
    setPostsList([...postsList, newPost]);
    // console.log(posts)
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

    console.log(editedPost);
    // Save the modified post to the state
    setPostsList(postsList.map((p) => (p.id === editedPost.id ? editedPost : p)));

    setEditPost(null);
  };

  const backToLogin = () => {
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
      <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvas" aria-labelledby="offcanvasLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasLabel">Menu</h5>
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          {/* Sidebar content goes here */}
          <button className="btn btn-primary" onClick={handleAddPost}>
            Add Post
          </button>
          <input type="text" className="form-control" placeholder="Search" />
          <button className="btn btn-warning mt-2" onClick={toggleTheme}>
            {darkTheme ? 'Light Theme' : 'Dark Theme'}
          </button>
          {/* Add other sidebar items as needed */}
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
                  <input type="text" className="form-control" id="title" onChange={handleChange}></input>
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Message:</label>
                  <textarea className="form-control" id="content" onChange={handleChange}></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Add Picture:</label>
                  <input type="file" className="form-control" id="profilePicture" name="profilePicture" accept="image/*" onChange={handleChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cencel</button>
              <button type="button" className="btn btn-primary" onClick={handleAddPost}>Add Post</button>
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
                  <input type="text" className="form-control" id="title" onChange={handleChange}></input>
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Message:</label>
                  <textarea className="form-control" id="content" onChange={handleChange}></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Add Picture:</label>
                  <input type="file" className="form-control" id="profilePicture" name="profilePicture" accept="image/*" onChange={handleChange} />
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
      {/* Toggle button for the Offcanvas sidebar */}
      <button className="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvas" aria-controls="offcanvas" >
        <i className="fa fa-bars"></i>
      </button>

      <div className='container'> 
      <nav className="navbar navbar-expand-lg bg-body-tertiary p-2">
        <div className="container-fluid">
          <div className="navbar-brand">Menu</div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse w-100" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item me-2">
                <button className={`btn btn-outline-${darkTheme ? "light" : "dark"} ml-2`} data-bs-toggle="modal" data-bs-target="#addPost">
                    Add post
                </button>
              </li>
              <li className="nav-item me-2">
                <button className={`btn btn-outline-${darkTheme ? "light" : "dark"} ml-2`} onClick={toggleTheme}>
                    {darkTheme ? 'Light Theme' : 'Dark Theme'}
                </button>
              </li>
              <li className="nav-item dropdown">
                <button className={`btn btn-outline-${darkTheme ? "light" : "dark"} dropdown-toggle me-2`} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </button>
                <ul className={`dropdown-menu me-2`}>
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li className="dropdown-divider"></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li>
              <li className="nav-item me-2">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
              </li>
              <li className="nav-item me-2">
              <button className="btn btn-outline-success me-2" type="submit">Search</button>
              </li>
            </ul>
            <form className="d-flex justify-content-start" role="search">
              <button className={`btn btn-outline-${darkTheme ? "light" : "dark"} ml-2`} onClick={backToLogin}>
                    Back
                </button>
            </form>
          </div>
        </div>
      </nav>

      <div className="row justify-content-center pt-4">
        {postsList.reverse().map((post) => (
          <div key={post.id} className="col-md-4 mb-3">
            <Post post={post} postsList={postsList} setPostsList={setPostsList} setEditPost={setEditPost}/>
          </div>
        ))}
      </div>
      </div> 
    </div>
  );
};

<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Open modal for @mdo</button>


export default FeedPage;
