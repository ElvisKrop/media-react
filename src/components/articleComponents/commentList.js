import React from "react";

const CommentList = () => {
  return (
    <div>
      <Comment />
      <Comment />
      <Comment />
    </div>
  );
};

function Comment() {
  return (
    <div>
      <p>comment</p>
    </div>
  );
}

export default CommentList;
