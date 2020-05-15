import React, { useState, useCallback } from "react";
import NewComment from "./newComment";
import CommentList from "./commentList";
import { withService } from "../../hocs";

const CommentBlock = ({ slug, username, mrService }) => {
  const [comments, setComments] = useState([]);

  const getCommentsCallback = useCallback(() => {
    mrService
      .getComments(slug)
      .then(({ comments }) => setComments(comments))
      .catch((err) => console.error(err));
  }, [slug, mrService]);

  const onDelete = (id) => {
    mrService.deleteComment(slug, id).finally(() => getCommentsCallback());
  };

  const forList = { slug, username, comments, onDelete, getCommentsCallback };

  return (
    <>
      <NewComment slug={slug} getCommentsCallback={getCommentsCallback} />
      <CommentList {...forList} />
    </>
  );
};
export default withService()(CommentBlock);
