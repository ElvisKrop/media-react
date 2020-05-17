import React, { Fragment, useState, useEffect, useCallback } from "react";
import Feed from "../../components/feed";
import { withToken } from "../../hocs";
import { Link } from "react-router-dom";
import TagsList from "../../components/homeComponents";

const HomePage = ({ isToken }) => {
  const [strFeed, setStrFeed] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  const setTag = useCallback((tagName) => {
    setSelectedTag(tagName);
    setStrFeed("TagFeed");
  }, []);

  useEffect(() => {
    if (typeof isToken !== "undefined") {
      if (isToken) setStrFeed("YourFeed");
      else setStrFeed("GlobalFeed");
    }
  }, [isToken]);

  let classYPost = "nav-link";
  let classGPost = "nav-link";
  let classTPost = "nav-link";

  switch (strFeed) {
    case "YourFeed":
      classYPost += ` bg-primary text-white`;
      break;
    case "GlobalFeed":
      classGPost += ` bg-primary text-white`;
      break;
    case "TagFeed":
      classTPost += ` bg-primary text-white`;
      break;
    default:
      break;
  }

  return (
    <Fragment>
      {isToken ? null : (
        <div
          style={{ maxHeight: "200px", boxShadow: "inset 0 0 15px grey" }}
          className="banner bg-success text-center py-5 text-white">
          <h1 className="font-weight-bolder">MediaReact</h1>
          <p>
            Here you can find a project developed by a team of two novice
            developers as part of a ReactJS graduation project.
          </p>
        </div>
      )}
      <div className="container row mx-auto mt-3">
        <div className="col-md-9">
          <ul className="nav nav-tabs border-bottom-0">
            {isToken ? (
              <button
                className={classYPost}
                onClick={() => setStrFeed("YourFeed")}>
                Your Feed
              </button>
            ) : (
              <Link className={classYPost} to="/login">
                Your Feed
              </Link>
            )}
            <button
              className={classGPost}
              onClick={() => setStrFeed("GlobalFeed")}>
              Global Feed
            </button>
            {strFeed === "TagFeed" && (
              <button className={classTPost}>#{selectedTag}</button>
            )}
          </ul>
          {strFeed && <Feed strFeed={strFeed} tagName={selectedTag} />}
        </div>
        <div className="col-md-3">
          <TagsList setSelectedTag={setTag} />
        </div>
      </div>
    </Fragment>
  );
};
export default withToken(HomePage);
