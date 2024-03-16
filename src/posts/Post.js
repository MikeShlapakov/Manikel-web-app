import { format } from 'date-fns'
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getUserByID } from '../Authentication';
// import {getAllPosts} from '../pages/feed-page/FeedPage.js';
// import posts from '../data/posts.json'

const Post = ({ token, post, setPostsList, setEditPost, setShowCommentsModal, setPostComments}) => {

  const navigate = useNavigate(); 

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('userId');
  const theme = queryParams.get('theme');

  // console.log("POST:", userId)
  // const friendID = queryParams.get('friendId');

  const [author, setAuthor] = useState([]);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // console.log(post.authorId)
        const author = await getUserByID(post.authorId);
        // console.log(u)
        setAuthor(author);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  async function getAllPosts() {
    const posts = await fetch('http://localhost:8080/api/posts/feed/'+ userId, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'authorization': 'bearer ' + token
        }
    }).then(data => data.json())
  
    // console.log(posts);
    return posts;
  }

  const [liked, setLiked] = useState(false);

  const handleEditPost = () => {
    setEditPost(post)
    // setEditPostId(post)
  };

  const handleDeletePost = async () => {
    await deletePost()
    setPostsList(await getAllPosts());
  };
  
  async function deletePost() {
    const posts = await fetch('http://localhost:8080/api/users/' + post.authorId + '/posts/' + post._id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            'authorization': 'bearer ' + token
        },
    }).then(data => data.json());
    // console.log(posts)
}

  const handleAddComment = () => {
    setPostComments(post)
    setShowCommentsModal(true)
  };

  const handleShare = () => {
    // Implement logic to share the post
  };

  const handleLike = async () => {
    try{
      const response = await fetch('http://localhost:8080/api/users/' + userId + '/posts/' + post._id, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            'authorization': 'bearer ' + token
        },
        body: JSON.stringify({
          ...post,
          likes: post.likes+(liked? -1:1)
        })
    })
      if (response.ok) {
        // Fetch the updated user data from the server
        setLiked(!liked)
        setPostsList(await getAllPosts());
      } else {
        console.error("Failed to delete friend request:", response.status);
      }
    } catch (error) {
      console.error("Error deleting friend request:", error);
    }
  };

  async function edit() {

  }

  const handleClick = () => {
    if (userId == author._id) return;
    handleFriends();
  };

  const handleFriends = () => {
    // console.log(friesdId)
    const queryParams = new URLSearchParams({
      userId: encodeURIComponent(userId),
      friendId: encodeURIComponent(author._id),
      theme: theme,
    });
    navigate(`/friends?${queryParams.toString()}`);
  };

  return (
    <div className="card" style={{boxShadow: "10px 10px 0 rgb(0,0,0,0.05)", }}>
      <nav className="navbar navbar-expand-lg bg-body-tertiary flex-column">
        <div className="container-fluid">
          <div className="title">
            <span className="title d-flex align-items-center gap-2" onClick={handleClick} style={{ }}>
              <img src={author.pfp} className="card-img-top" style={{ width: '50px', height: '50px', marginRight: "0 !important", borderRadius: "10px" }}/>
                {author.displayName}
            </span>
          </div>     
          {(author._id == userId) && (
          <div className="dropstart ms-auto">
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
          )}
        </div>
      </nav>
            
      <div className="card-body">
        <img src={post.image} className="card-img" style={{ margin: "0 !important" }}/>
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