import React from "react";
import PropTypes from "prop-types";
import { withToken } from "../../../hocs";
import { useUpgradeState } from "../../../hooks";
import { Link } from "react-router-dom";

const NewComment = ({ image, isToken, submitNewComment }) => {
  const [newComment, setNewComment] = useUpgradeState("", true);

  const onSubmitComment = (e) => {
    e.preventDefault();
    submitNewComment(newComment);
    setNewComment("");
  };

  if (!isToken)
    return (
      <p>
        <Link to="/login">Sign in</Link> or <Link to="/register">sign up</Link>{" "}
        to add comments on this article.
      </p>
    );

  return (
    <>
      <form onSubmit={onSubmitComment} className="card border-primary mb-2">
        <div className="form-group card-body p-0 m-0">
          <textarea
            className="form-control"
            id="exampleTextarea"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows="3"
            placeholder="Write a comment..."
          />
        </div>
        <div className="card-header d-flex justify-content-between align-items-center border-0">
          <img src={image} className="icon-image" alt="icon" />
          <button type="submit" className="btn btn-outline-primary card-header">
            Post Comment
          </button>
        </div>
      </form>
    </>
  );
};

NewComment.propTypes = {
  image: PropTypes.string,
  isToken: PropTypes.bool,
  submitNewComment: PropTypes.func
};

export default withToken(NewComment);
