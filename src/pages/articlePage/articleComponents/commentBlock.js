import React, { useCallback, useEffect } from "react";
import NewComment from "./newComment";
import ErrorList from "../../../components/errorList";
import CommentList from "./commentList";
import { withService } from "../../../hocs";
import useUpgradeState from "../../../hooks";

const CommentBlock = ({ slug, username, mrService, image }) => {
  const [comments, setComments] = useUpgradeState([], !!slug);
  const [loading, setLoading] = useUpgradeState(false, !!slug);
  const [errors, setErrors] = useUpgradeState({}, !!slug);

  useEffect(() => {
    mrService
      .getComments(slug)
      .then(({ comments }) => setComments(comments))
      .catch(console.error);
  }, [slug, mrService, setComments]);

  const _deleteOneComment = useCallback(
    (id) => {
      const temp = comments.filter((item) => item.id !== id);
      setComments(temp);
      setLoading(false);
    },
    [comments, setLoading, setComments]
  );

  const onDelete = useCallback(
    (id) => {
      setErrors({});
      setLoading(true);
      mrService.deleteComment(slug, id).finally(() => _deleteOneComment(id));
    },
    [mrService, slug, _deleteOneComment, setLoading, setErrors]
  );

  const submitNewComment = useCallback(
    (newCom) => {
      setErrors({});
      mrService
        .postComment(slug, { body: newCom })
        .then(({ comment }) => setComments([comment, ...comments]))
        .catch(({ errors }) => setErrors(errors));
    },
    [mrService, slug, comments, setComments, setErrors]
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
