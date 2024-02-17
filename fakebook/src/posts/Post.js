import React, { useState } from 'react';
// import posts from '../data/posts.json'

const Post = ({ post, postsList, setPostsList, setEditPost, setShowCommentsModal, setPostComments}) => {

  // const [postsList, setPostsList] = useState(posts);

  const handleEditPost = () => {
    setEditPost(post)
    // setEditPostId(post)
  };

  const handleDeletePost = () => {
    setPostsList(postsList.filter((p) => p.id !== post.id))
  };

  const handleAddComment = () => {
    setPostComments(post)
    setShowCommentsModal(true)
  };

  const handleShare = () => {
    // Implement logic to share the post
  };

  const handleLike = () => {
    const updateLikes = {
      ...post,
      likes: post.likes+1
    }
    setPostsList(postsList.map((p) => (p.id === updateLikes.id ? updateLikes : p)))
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
                      <span className="dropdown-item" onClick={handleEditPost}>
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
            <i className="fa fa-comments"></i> Comments ({post.comments.length})
          </button>
          <button className="btn btn-outline-success me-2" onClick={handleLike}>
            <i className="fa fa-thumbs-up"></i> ({post.likes})
          </button>
          <button className="btn btn-outline-warning text-reset me-2"  onClick={handleShare} aria-label="Close">
            <i className="fa fa-share"></i>
          </button>
        </div>
        <p className="card-text">{post.date}</p> 
        {/* Display comments here */}
      </div>
    </div>
  );
};

export default Post;