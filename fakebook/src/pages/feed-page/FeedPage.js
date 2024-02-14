import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import Post from '../../posts/Post';
import posts from '../../data/posts.json'

function FeedPage() {
  const navigate = useNavigate(); 

  const [postslist, setPosts] = useState(posts);
  
  const [darkTheme, setDarkTheme] = useState(false);

  const handleAddPost = () => {
    // Implement logic to add a new post
  };

  const backToLogin = () => {
    navigate("/")
  };

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  return (
    <div className={`container-fluid pt-4 pb-4 ${darkTheme ? "container-dark bg-dark" : ""}`} data-bs-theme={darkTheme ? "dark" : "light"}>
      <div className='container'> 
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand">Menu</a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item me-2">
              <button className={`btn btn-outline-${darkTheme ? "light" : "dark"} ml-2`} onClick={backToLogin}>
                    Home
                </button>
              </li>
              <li className="nav-item me-2">
                <button className={`btn btn-outline-${darkTheme ? "light" : "dark"} ml-2`} onClick={toggleTheme}>
                    {darkTheme ? 'Light Theme' : 'Dark Theme'}
                </button>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li className="dropdown-divider"></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
        {/* <nav className="navbar navbar-expand justify-content-center">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <button className="btn btn-primary" onClick={handleAddPost}>
                  Add Post
                </button>
              </li>
              <li className="nav-item">
                <input type="text" className="form-control" placeholder="Search" />
              </li>
              <li className="nav-item">
                <button className="btn btn-warning ml-2" onClick={toggleTheme}>
                  {darkTheme ? 'Light Theme' : 'Dark Theme'}
                </button>
              </li>
            </ul>
          </div>
        </nav> */}

        <div className="row justify-content-center ">
          {posts.map((post) => (
            <div key={post.id} className="col-md-4 mb-3">
              <Post post={post} />
            </div>
          ))}
        </div>
      </div> 
    </div>
  );
};

export default FeedPage;
