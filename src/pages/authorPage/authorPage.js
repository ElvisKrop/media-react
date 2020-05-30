import React, { useEffect } from "react";
import { useUpgradeState } from "../../hooks";
import { UserBanner } from "./authorComponents";
import Feed from "../../components/feed";
import { withService } from "../../hocs";
import { Link } from "react-router-dom";
import Spinner from "../../components/spinner";
import PropTypes from "prop-types";
import "./authorPage.scss";

function AuthorPage({ mrService, username, strFeed }) {
  const [profile, setProfile] = useUpgradeState({}, !!username);
  const [loading, setLoading] = useUpgradeState(false, !!username);

  useEffect(() => {
    setLoading(true);
    mrService
      .getProfile(username)
      .then(({ profile }) => setProfile(profile))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [mrService, username, setLoading, setProfile]);

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

AuthorPage.propTypes = {
  mrService: PropTypes.object,
  username: PropTypes.string,
  strFeed: PropTypes.string
};

export default withService()(AuthorPage);
