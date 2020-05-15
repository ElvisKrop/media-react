import React from "react";

const TagList = ({ tagList }) => {
  return (
    <div>
      {tagList.map((tag, i) => (
        <span
          key={i + tag}
          className="badge badge-light border border-dark text-muted px-2 mx-1">
          {tag}
        </span>
      ))}
    </div>
  );
};
export default TagList;
