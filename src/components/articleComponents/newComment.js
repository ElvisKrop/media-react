import React from "react";
import { withToken } from "../../hocs";

const NewComment = ({ isToken }) => {
  return (
    <div>
      <textarea className="w-100"></textarea>
    </div>
  );
};

export default withToken(NewComment);
