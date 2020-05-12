import React, { useState, useEffect } from "react";
import Feed from "../../components/feed";
import { ButtonFollow } from "../../components/buttons/index";
import { withService } from "../../hocs";
import { Link } from "react-router-dom";
import "./authorPage.css";
import Spinner from "../../components/spinner";

const styleImg = {
  width: "100px",
  height: "100px",
  margin: "10px 0 16px 0",
  borderRadius: "50px",
};

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
        {loading ? <Spinner /> : <Head {...profile} />}
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

function Head({ image, bio, username, following }) {
  return (
    <div className="container">
      <div className="col-xs-12 col-md-10 m-auto">
        <img src={image} alt={username} style={styleImg} />
        <h4 className="font-weight-bold w-100 overflow-hidden">{username}</h4>
        <p className="text-muted">{bio}</p>
        <div className="text-right">
          <ButtonFollow
            profile={{ username, following }}
            className="float-right"
          />
        </div>
      </div>
    </div>
  );
}

export default withService()(AuthorPage);
