import { format } from 'date-fns'
import React, { useState } from 'react';
// import posts from '../data/posts.json'

const Post = ({ post, postsList, setPostsList, setEditPost, setShowCommentsModal, setPostComments}) => {

  const [liked, setLiked] = useState(false);

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
      likes: post.likes+(liked? -1:1)
    }
    setLiked(!liked)
    setPostsList(postsList.map((p) => (p.id === updateLikes.id ? updateLikes : p)))
    // Implement logic to handle liking a post
  };

  return (
    <div className="card" style={{ minWidth: '490px', height: '600px' }}>
      <nav className="navbar navbar-expand-lg bg-body-tertiary flex-column">
        <div className="container-fluid">
          <div className="title me-2">{post.author}</div>     
          <img src={post.profile} className="card-img-top" style={{ width: '50px', height: '50px' }}/>
          <div className="dropdown ms-auto">
                  <i className="bi bi-three-dots" data-bs-toggle="dropdown"></i>
                  <ul className="dropdown-menu">
                      <li>
                      <span className="dropdown-item" onClick={handleEditPost}>
                          <i className="bi bi-pencil"></i> Edit Post
                      </span>
                      </li>
                      <li>
                      <span title="delete btn" className="dropdown-item" onClick={handleDeletePost}>
                          <i className="bi bi-trash"></i> Delete Post
                      </span>
                      </li>
                  </ul>
          </div>
        </div>
      </nav>
            
      <div className="card-body">
        <img src={post.img} className="card-img m-3" style={{ width: '420px', height: '300px' }}/>
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text" style={{ maxHeight: '60px', minHeight: '60px', overflow: 'auto' }}>{post.content}</p>
        <div className="grid gap-2">
          <button className="btn btn-outline-info me-2" onClick={handleAddComment}>
            <i className="fa fa-comments"></i> Comments ({post.comments.length})
          </button>
          <button className={`btn ${liked ? "btn-success":"btn-outline-success"} me-2`} onClick={handleLike}>
            <i className="fa fa-thumbs-up"></i> ({post.likes})
          </button>
          <div className="btn btn-outline-warning me-2"  data-bs-toggle="dropdown">
            <i className="fa fa-share"></i>
            <ul className="dropdown-menu">
                <li>
                <span className="dropdown-item">
                    <i className="bi bi-archive"></i> archive
                </span>
                </li>
                <li>
                <span title="delete btn" className="dropdown-item">
                    <i className="fa fa-google"></i> google
                </span>
                </li>
                <li>
                <span className="dropdown-item">
                  <i className="fa fa-facebook"></i> facebook
                </span>
                </li>
                <li>
                <span title="delete btn" className="dropdown-item">
                  <i className="fa fa-whatsapp"></i> whatsapp
                </span>
                </li>
            </ul>
          </div>
        </div>
        <p className="card-text pt-1">{format(post.date, "dd/MM/yyyy")}</p> 
        {/* Display comments here */}
      </div>
    </div>
  );
};

<button type="button" class="btn btn-secondary"
        >
  Custom popover
</button>

export default Post;