import React, { useState } from "react";
import { withToken } from "../../../hocs";
import { Link } from "react-router-dom";

const style = {
  height: "32px",
  width: "32px",
  borderRadius: "50%",
  boxShadow: "0 0 3px black"
};

const NewComment = ({ image, isToken, submitNewComment }) => {
  const [newComment, setNewComment] = useState("");

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
          <img src={image} style={style} alt="icon" />
          <button type="submit" className="btn btn-outline-primary card-header">
            Post Comment
          </button>
        </div>
      </form>
    </>
  );
};

export default withToken(NewComment);
