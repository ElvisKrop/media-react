import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { withService } from "../../../hocs";
import { useUpgradeState } from "../../../hooks";

const Tag = ({ label, selectTag }) => {
  return (
    <button
      type="button"
      className="btn btn-warning btn-sm m-1"
      onClick={selectTag}>
      {label}
    </button>
  );
};

const TagsList = ({ mrService, setSelectedTag }) => {
  const [tags, setTags] = useUpgradeState([], true);

  useEffect(() => {
    mrService.getTags().then(setTags);
  }, [mrService, setTags]);

  return (
    <div className="card bg-light">
      <div className="card-header">Popular Tags</div>
      <div className="card-body p-0 d-flex flex-wrap justify-content-around">
        {tags.map((item, i) => (
          <Tag
            key={item + i}
            label={item}
            selectTag={() => setSelectedTag(item)}
          />
        ))}
      </div>
    </div>
  );
};

TagsList.propTypes = {
  mrService: PropTypes.object,
  setSelectedTag: PropTypes.func
};

export default withService()(TagsList);
