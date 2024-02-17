import React, { useState } from 'react';

const Comments = ({ show, handleClose, addComment, post }) => {

    // console.log(post)
    // console.log(1)

    const existingComments = post? post.comments: [];

    const [newComment, setNewComment] = useState('');

    const [editingCommentIndex, setEditingCommentIndex] = useState(-1);
  
    const handleAddComment = () => {

        if (editingCommentIndex !== -1) {
            // If an edit is in progress, update the existing comment
            const updatedComments = [...existingComments];
            updatedComments[editingCommentIndex] = newComment;
            setNewComment('');
            setEditingCommentIndex(-1);
            addComment(post, updatedComments);
        } else {
        // Add a new comment
            addComment(post, [...existingComments, newComment]);
            setNewComment('');
        }
    };

    const handleEditComment = (index) => {
        // Set the comment at the specified index to the input field
        setNewComment(existingComments[index]);
        setEditingCommentIndex(index);
    };

    const handleCancelEdit = () => {
        // Clear the input field and exit edit mode
        setNewComment('');
        setEditingCommentIndex(-1);
    }; 

    const handleKeyDown = (event) => {
        // If the user presses "Enter" while editing, prevent the default action and save the edited comment
        // console.log(event.key)
        if (event.key === 'Enter') { 
            event.preventDefault();
            handleAddComment();
        }
    };
  
    return (
      <div className={`modal ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Comments</h5>
              <button type="button" className="btn-close" onClick={handleClose}/>
            </div>
            <div className="modal-body">
                <ul className="list-group">
                    {existingComments.map((comment, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        {editingCommentIndex === index ? (
                            // If editing, display input field
                            <>
                            <input
                                type="text"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                onKeyDown={handleKeyDown}
                            ></input>
                            <button className='btn-close' onClick={handleCancelEdit}></button>
                            </>
                            
                        ) : (
                            // If not editing, display comment and edit button
                            <>
                            {comment}
                            <span className="dropdown">
                                <i className="bi bi-three-dots" data-bs-toggle="dropdown"></i>
                                <ul className="dropdown-menu">
                                    <li>
                                    <span className="dropdown-item" onClick={() => handleEditComment(index)}>
                                        <i className="bi bi-pencil"></i> Edit Comment
                                    </span>
                                    </li>
                                    <li>
                                    <span className="dropdown-item" onClick={""}>
                                        <i className="bi bi-trash"></i> Delete Comment
                                    </span>
                                    </li>
                                </ul>
                            </span>
                            </>
                        )}
                        </li>
                        ))}

                        {/* {comment}  */}

                </ul>
                {/* Section for adding new comments */}
            </div>
            <div className="modal-footer">
                <input type="text" className="form-control" aria-label="Recipient's username" aria-describedby="button-addon2"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Enter your comment..."></input>
                <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={handleAddComment} >Add Comment</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default Comments;