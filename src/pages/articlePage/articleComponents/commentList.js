import React from "react";
import PropTypes from "prop-types";
import UserIcon from "../../../components/userIcon";
import Spinner from "../../../components/spinner";

const CommentList = ({ username, comments, onDelete, loading }) => {
  if (loading) return <Spinner />;

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

CommentList.propTypes = {
  username: PropTypes.string,
  comments: PropTypes.arrayOf(PropTypes.object),
  onDelete: PropTypes.func,
  loading: PropTypes.bool
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

Comment.propTypes = {
  author: PropTypes.shape({
    username: PropTypes.string
  }),
  body: PropTypes.string,
  createdAt: PropTypes.string,
  username: PropTypes.string,
  onDelete: PropTypes.func
};

export default CommentList;
