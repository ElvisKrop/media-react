import React, { useState, useCallback, useEffect, useRef } from "react";
import NewComment from "./newComment";
import ErrorList from "../../../components/errorList";
import CommentList from "./commentList";
import { withService } from "../../../hocs";

function checkMountingConstructor(fn, flag) {
  return flag ? fn : null;
}

const CommentBlock = ({ slug, username, mrService, image }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const subRef = useRef(!!slug);

  const upgradeSetComments = useCallback(
    (comments) => {
      return checkMountingConstructor(setComments(comments), subRef.current);
    },
    [subRef]
  );

  const upgradeSetLoading = useCallback(
    (load) => {
      return checkMountingConstructor(setLoading(load), subRef.current);
    },
    [subRef]
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

  const onDelete = useCallback(
    (id) => {
      setErrors({});
      upgradeSetLoading(true);
      mrService
        .deleteComment(slug, id)
        .finally(() => (subRef.current ? _deleteOneComment(id) : null));
    },
    [mrService, slug, _deleteOneComment, upgradeSetLoading]
  );

  const submitNewComment = useCallback(
    (newCom) => {
      setErrors({});
      mrService
        .postComment(slug, { body: newCom })
        .then(({ comment }) => {
          if (subRef.current) {
            upgradeSetComments([comment, ...comments]);
          }
        })
        .catch(({ errors }) => {
          if (subRef.current) {
            setErrors(errors);
          }
        });
    },
    [mrService, slug, comments, upgradeSetComments]
  );
  const forList = { username, comments, onDelete, loading };
  const forNewCom = { image, submitNewComment };
  return (
    <>
      <ErrorList errors={errors} />
      <NewComment {...forNewCom} />
      <CommentList {...forList} />
    </>
  );
};
export default withService()(CommentBlock);
