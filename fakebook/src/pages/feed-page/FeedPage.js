import React, { useState } from 'react';
import Post from '../../posts/Post';
import posts from '../../posts/data.json'

function FeedPage() {
  const [postslist, setPosts] = useState(posts);
  
  const handleAddPost = () => {
    // Implement logic to add a new post
  };

  return (
    <div className="container mt-4">
      <div className="row mb-3">
        <div className="col-md-6">
          <button className="btn btn-primary" onClick={handleAddPost}>Add Post</button>
        </div>
        <div className="col-md-6">
          <input type="text" className="form-control" placeholder="Search" />
          {/* Add other menu items as needed */}
        </div>
      </div>

      <div className="row">
        {
          posts.map((post) => (
            <div key={post.id} className="col-md-4 mb-3">
              <Post post={post} />
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default FeedPage;
