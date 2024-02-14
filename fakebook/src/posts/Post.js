import React, { useState } from 'react';
import posts from '../data/posts.json'

const Post = ({ post }) => {

    const [postsList, setPostsList] = useState(posts);

    const handleEditPost = () => {
        // Implement logic to edit the post
      };
    
      const handleDeletePost = () => {
        setPostsList([...postsList].pop(post))
      };
    
      const handleAddComment = () => {
        // Implement logic to add a comment
      };
    
      const handleShare = () => {
        // Implement logic to share the post
      };
    
      const handleLike = () => {
        // Implement logic to handle liking a post
      };

  return (
    <div className="card">
      <nav className="navbar navbar-expand-lg bg-body-tertiary flex-column">
        <div className="container-fluid">
          <div className="title me-2">{post.author}</div>     
          <img src={post.img} className="card-img-top" />
          <div className="dropdown ms-auto">
                  <i className="bi bi-three-dots" data-bs-toggle="dropdown"></i>
                  <ul className="dropdown-menu">
                      <li>
                      <span className="dropdown-item">
                          <i className="bi bi-pencil"></i> Edit Post
                      </span>
                      </li>
                      <li>
                      <span className="dropdown-item" onClick={handleDeletePost}>
                          <i className="bi bi-trash"></i> Delete Post
                      </span>
                      </li>
                  </ul>
          </div>
          
        </div>
      </nav>
            
      <div className="card-body">
        <img src={post.img} className="card-img-top" />
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">{post.content}</p>
        <div className="grid gap-3">
          <button className="btn btn-outline-info me-2" onClick={handleAddComment}>
            <i class="fa fa-comments"></i> Comments
          </button>
          <button className="btn btn-outline-success me-2" onClick={handleLike}>
            <i class="fa fa-thumbs-up"></i> ({post.likes})
          </button>
          <button className="btn btn-outline-warning text-reset me-2"  onClick={handleShare} aria-label="Close">
            <i class="fa fa-share"></i>
          </button>
        </div>
        <p className="card-text">{post.date}</p> 
        {/* Display comments here */}
      </div>
    </div>
  );
};

export default Post;