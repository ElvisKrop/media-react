import React from "react";
import UserIcon from "../userIcon";

const CommentList = ({ username, comments, onDelete }) => {
  return (
    <div>
      {comments.map((item) => (
        <Comment
          key={item.id}
          {...item}
          username={username}
          onDelete={() => onDelete(item.id)}
        />
      ))}
    </div>
  );
};

function Comment({ author, body, createdAt, username, onDelete }) {
  const forUser = { ...author, createdAt };
  return (
    <div className="card bg-light mb-3">
      <div className="card-header d-flex justify-content-between align-items-center">
        <UserIcon {...forUser} />
        {username === author.username ? (
          <button
            type="button"
            className="btn btn-outline-dark rounded-circle"
            onClick={onDelete}>
            <i className="fas fa-trash-alt" />
          </button>
        ) : null}
      </div>
      <div className="card-body">
        <p className="card-text">{body}</p>
      </div>
    </div>
  );
}

export default CommentList;
