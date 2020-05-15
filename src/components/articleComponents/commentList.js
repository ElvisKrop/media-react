import React, { useEffect, useState, useCallback } from "react";
import { withService } from "../../hocs";
import UserIcon from "../userIcon";

const CommentList = ({ slug, mrService, username }) => {
  const [comments, setComments] = useState([]);

  const getCommentsCallback = useCallback(() => {
    mrService
      .getComments(slug)
      .then(({ comments }) => setComments(comments))
      .catch((err) => console.error(err));
  }, [slug, mrService]);

  useEffect(() => {
    getCommentsCallback();
  }, [getCommentsCallback]);

  const onDelete = (id) => {
    mrService.deleteComment(slug, id).finally(() => getCommentsCallback());
  };

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

function Comment({
  author,
  body,
  createdAt,
  id,
  updatedAt,
  username,
  onDelete
}) {
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

export default withService()(CommentList);
