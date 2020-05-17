import React, { useEffect, useState } from "react";
import { withService } from "../../hocs";

const Tag = ({ label }) => {
  return (
    <button type="button" className="btn btn-warning btn-sm m-1">
      {label}
    </button>
  );
};

const TagsList = ({ mrService }) => {
  const [tags, setTags] = useState([]);
  useEffect(() => {
    mrService.getTags().then(({ tags }) => setTags(tags));
  }, [mrService]);
  return (
    <div className="card bg-light">
      <div className="card-header">Popular Tags</div>
      <div className="card-body p-0 d-flex flex-wrap justify-content-around">
        {tags.map((item, i) => (
          <Tag key={item + i} label={item} />
        ))}
      </div>
    </div>
  );
};
export default withService()(TagsList);
