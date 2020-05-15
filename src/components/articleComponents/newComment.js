import React, { useState } from "react";
import { withToken, withService } from "../../hocs";
import { Link } from "react-router-dom";

const NewComment = ({ slug, isToken, mrService, getCommentsCallback }) => {
  const [comment, setComment] = useState("");

  const onSubmitComment = (e) => {
    e.preventDefault();
    mrService
      .postComment(slug, { body: comment })
      .then(getCommentsCallback)
      .catch((err) => console.error(err));
    setComment("");
  };

  if (!isToken)
    return (
      <p>
        <Link to="/login">Sign in</Link> or <Link to="/register">sign up</Link>{" "}
        to add comments on this article.
      </p>
    );

  return (
    <form onSubmit={onSubmitComment}>
      <fieldset>
        <div className="form-group">
          <textarea
            className="form-control"
            id="exampleTextarea"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="3"></textarea>
        </div>
      </fieldset>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default withService()(withToken(NewComment));
