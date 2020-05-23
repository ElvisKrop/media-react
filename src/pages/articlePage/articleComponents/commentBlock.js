import React, { useState, useCallback, useEffect, useRef } from "react";
import NewComment from "./newComment";
import CommentList from "./commentList";
import { withService } from "../../../hocs";

function checkMountingConstructor(fn, flag) {
  return flag ? fn : null;
}

const CommentBlock = ({ slug, username, mrService, image }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const subRef = useRef(true);

  const upgradeSetComments = useCallback(
    (comments) => {
      return checkMountingConstructor(
        setComments(comments),
        slug && subRef.current
      );
    },
    [subRef, slug]
  );

  const upgradeSetLoading = useCallback(
    (load) => {
      return checkMountingConstructor(setLoading(load), slug && subRef.current);
    },
    [subRef, slug]
  );

  useEffect(() => {
    mrService
      .getComments(slug)
      .then(({ comments }) => upgradeSetComments(comments))
      .catch(console.error);
    return () => {
      subRef.current = false;
    };
  }, [slug, mrService, upgradeSetComments]);

  const _deleteOneComment = useCallback(
    (id) => {
      const temp = comments.filter((item) => item.id !== id);
      upgradeSetComments(temp);
      upgradeSetLoading(false);
    },
    [comments, upgradeSetLoading, upgradeSetComments]
  );

  const addOneComment = useCallback(
    (comment) => {
      const temp = [comment, ...comments];
      upgradeSetComments(temp);
    },
    [comments, upgradeSetComments]
  );

  const onDelete = useCallback(
    (id) => {
      upgradeSetLoading(true);
      mrService
        .deleteComment(slug, id)
        .finally(() => (subRef.current && slug ? _deleteOneComment(id) : null));
    },
    [mrService, slug, _deleteOneComment, upgradeSetLoading]
  );

  const getStateLoad = (load) => {
    upgradeSetLoading(load);
  };

  const forList = { username, comments, onDelete, loading };
  const forNewCom = { slug, image, addOneComment, getStateLoad };

  return (
    <>
      <NewComment {...forNewCom} />
      <CommentList {...forList} />
    </>
  );
};
export default withService()(CommentBlock);
