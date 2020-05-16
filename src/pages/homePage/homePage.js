import React, { Fragment, useState, useEffect } from "react";
import Feed from "../../components/feed";
import { withToken } from "../../hocs";

const HomePage = ({ isToken }) => {
  const [strFeed, setStrFeed] = useState("GlobalFeed");

  useEffect(() => {
    if (isToken) setStrFeed("YourFeed");
  }, [isToken]);

  let classYPost = "nav-link";
  let classGPost = "nav-link";

  if (strFeed === "YourFeed") {
    classYPost += ` bg-primary text-white`;
  } else {
    classGPost += ` bg-primary text-white`;
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
      <div className="container row m-auto">
        <div className="col-md-9">
          <ul className="nav nav-tabs border-bottom-0">
            <button className={classYPost}>Your Feed</button>
            <button className={classGPost}>Global Feed</button>
          </ul>
          <Feed strFeed={"GlobalFeed"} />
        </div>
        <div className="col-md-3">TAGS</div>
      </div>
    </Fragment>
  );
};
export default withToken(HomePage);
