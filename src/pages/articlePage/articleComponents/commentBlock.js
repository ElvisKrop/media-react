import React, { useState, useCallback, useEffect, useRef } from "react";
import NewComment from "./newComment";
import CommentList from "./commentList";
import { withService } from "../../../hocs";

const CommentBlock = ({ slug, username, mrService, image }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const subRef = useRef(true);

  useEffect(() => {
    mrService
      .getComments(slug)
      .then(({ comments }) =>
        slug && subRef.current ? setComments(comments) : null
      )
      .catch((err) => (slug && subRef.current ? console.error(err) : null));
    return () => {
      subRef.current = false;
    };
  }, [slug, mrService]);

  const _deleteOneComment = useCallback(
    (id) => {
      const temp = comments.filter((item) => item.id !== id);
      setComments(temp);
      setLoading(false);
    },
    [comments]
  );

  const addOneComment = useCallback(
    (comment) => {
      setLoading(true);
      const temp = [comment, ...comments];
      setComments(temp);
    },
    [comments]
  );

  const onDelete = useCallback(
    (id) => {
      setLoading(true);
      mrService
        .deleteComment(slug, id)
        .finally(() => (slug && subRef.current ? _deleteOneComment(id) : null));
    },
    [mrService, slug, _deleteOneComment]
  );

  const getStateLoad = (load) => {
    setLoading(load);
  };

  const forList = { username, comments, onDelete };
  const forNewCom = { slug, image, addOneComment, getStateLoad };

  return (
    <>
      <NewComment {...forNewCom} />
      <CommentList {...{ loading, ...forList }} />
    </>
  );
};
export default withService()(CommentBlock);
