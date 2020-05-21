import React, { useState, useEffect, useRef } from "react";
import ErrorList from "../../../components/errorList";
import { withToken, withService } from "../../../hocs";
import { Link } from "react-router-dom";

const style = {
  height: "32px",
  width: "32px",
  borderRadius: "50%",
  boxShadow: "0 0 3px black"
};

const NewComment = ({
  slug,
  image,
  addOneComment,
  getStateLoad,
  isToken,
  mrService
}) => {
  const [newComment, setNewComment] = useState("");
  const [errors, setErrors] = useState({});
  const subRef = useRef(true);
  useEffect(() => {
    return () => {
      subRef.current = false;
    };
  }, []);

  const onSubmitComment = (e) => {
    getStateLoad(true);
    e.preventDefault();
    mrService
      .postComment(slug, { body: newComment })
      .then(({ comment }) => {
        if (subRef.current) {
          addOneComment(comment);
          setErrors({});
        }
      })
      .catch(({ errors }) => (subRef.current ? setErrors(errors) : null))
      .finally(() => getStateLoad(false));
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
      <ErrorList errors={errors} />
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

export default withService()(withToken(NewComment));
