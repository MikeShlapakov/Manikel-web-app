import React from 'react';

const Post = ({ post }) => {
    const handleEditPost = () => {
        // Implement logic to edit the post
      };
    
      const handleDeletePost = () => {
        // Implement logic to delete the post
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
            <div className="dropdown ms-auto">
                <i className="bi bi-three-dots" data-bs-toggle="dropdown"></i>
                <ul className="dropdown-menu">
                    <li>
                    <span className="dropdown-item">
                        <i className="fas fa-pen mx-2"></i> Edit Post
                    </span>
                    </li>
                    <li>
                    <span className="dropdown-item">
                        <i className="fas fa-trash mx-2"></i> Delete Post
                    </span>
                    </li>
                </ul>
            </div>
      <img src={post.img} alt={`Post ${post.id}`} className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">{post.content}</p>
            <div className="grid gap-3">
                <button className="btn btn-success g-col-6" onClick={handleLike}>
                Like ({post.likes})
                </button>
                <button className="btn btn-info g-col-6" onClick={handleAddComment}>
                Add Comment
                </button>
                <button className="btn btn-secondary g-col-6" onClick={handleShare}>
                Share
                </button>
            </div> 
        {/* Display comments here */}
      </div>
    </div>
  );
};

export default Post;