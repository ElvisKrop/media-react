import React from "react";

const TagList = ({ tagList }) => (
  <div>
    {tagList.map((tag, i) => (
      <span
        key={i + tag}
        className="badge badge-light border border-active text-muted px-2 mx-1 mw-100 overflow-hidden">
        {tag}
      </span>
    ))}
  </div>
);
export default TagList;
