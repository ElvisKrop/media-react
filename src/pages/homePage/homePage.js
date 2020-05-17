import React, { Fragment, useState, useEffect } from "react";
import Feed from "../../components/feed";
import { withToken } from "../../hocs";
import { Redirect } from "react-router";
import TagsList from "../../components/homeComponents";

const HomePage = ({ isToken }) => {
  const [strFeed, setStrFeed] = useState("");

  useEffect(() => {
    if (typeof isToken !== "undefined") {
      if (isToken) setStrFeed("YourFeed");
      else setStrFeed("GlobalFeed");
    }
  }, [isToken]);

  let classYPost = "nav-link";
  let classGPost = "nav-link";

  if (strFeed === "YourFeed") {
    classYPost += ` bg-primary text-white`;
  } else if (strFeed === "GlobalFeed") {
    classGPost += ` bg-primary text-white`;
  } /*  else if */

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
            <button
              className={classYPost}
              onClick={() =>
                isToken ? setStrFeed("YourFeed") : <Redirect to="/login" />
              }>
              Your Feed
            </button>
            <button
              className={classGPost}
              onClick={() => setStrFeed("GlobalFeed")}>
              Global Feed
            </button>
          </ul>
          <Feed strFeed={strFeed} />
        </div>
        <div className="col-md-3">
          <TagsList />
        </div>
      </div>
    </Fragment>
  );
};
export default withToken(HomePage);
