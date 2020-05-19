import React, { useState, useEffect } from "react";
import { UserBanner } from "./authorComponents";
import Feed from "../../components/feed";
import { withService } from "../../hocs";
import { Link } from "react-router-dom";
import Spinner from "../../components/spinner";
import "./authorPage.scss";

function AuthorPage({ mrService, username, strFeed }) {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    mrService
      .getProfile(username)
      .then(({ profile }) => setProfile(profile))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [mrService, username]);

  let classMPost = "nav-link";
  let classFPost = "nav-link";

  if (strFeed === "MyPosts") {
    classMPost += ` bg-primary text-white`;
  } else {
    classFPost += ` bg-primary text-white`;
  }

  return (
    <>
      <div style={{ background: "#f3f3f3" }} className=" text-center py-4 mb-4">
        {loading ? <Spinner /> : <UserBanner {...profile} />}
      </div>
      <div className="container text-center">
        <div className="col-md-9 m-auto">
          <ul className="nav nav-tabs border-bottom-0">
            <Link className={classMPost} to={`/profile/${username}`}>
              My Posts
            </Link>
            <Link className={classFPost} to={`/profile/${username}/favorites`}>
              Favorited Posts
            </Link>
          </ul>
          <Feed strFeed={strFeed} author={username} />
        </div>
      </div>
    </>
  );
}

export default withService()(AuthorPage);
