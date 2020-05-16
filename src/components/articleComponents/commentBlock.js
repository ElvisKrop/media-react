import React, { useState, useCallback, useEffect, useRef } from "react";
import NewComment from "./newComment";
import CommentList from "./commentList";
import { withService } from "../../hocs";

const CommentBlock = ({ slug, username, mrService, image }) => {
  const [comments, setComments] = useState([]);
  const subRef = useRef(true);
  useEffect(() => {
    return () => {
      subRef.current = false;
    };
  }, []);

  const getCommentsCallback = useCallback(
    (subscribe) => {
      mrService
        .getComments(slug)
        .then(({ comments }) => (subscribe ? setComments(comments) : null))
        .catch((err) => (subscribe ? console.error(err) : null));
    },
    [slug, mrService]
  );

  const onDelete = (id) => {
    mrService
      .deleteComment(slug, id)
      .finally(() => getCommentsCallback(subRef.current));
  };

  const forList = { slug, username, comments, onDelete, getCommentsCallback };

  return (
    <>
      <NewComment
        slug={slug}
        image={image}
        getCommentsCallback={getCommentsCallback}
      />
      <CommentList {...forList} />
    </>
  );
};
export default withService()(CommentBlock);
