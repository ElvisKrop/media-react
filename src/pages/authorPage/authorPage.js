import React, { useState, useEffect } from "react";
import Feed from "../../components/feed";
import { ButtonFollow } from "../../components/buttons/index";
import { withService } from "../../hocs";
import Spinner from "../../components/spinner";
import "./authorPage.css";

const styleImg = {
  width: "100px",
  height: "100px",
  margin: "10px 0 16px 0",
  borderRadius: "50px",
};

function AuthorPage({ mrService, username }) {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    mrService.getProfile(username).then((data) => setProfile(data.profile));
    setLoading(false);
  }, [mrService, username]);

  const { image, bio } = profile;

  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      <div style={{ background: "#f3f3f3" }} className=" text-center py-4">
        <div className="container">
          <div className="col-xs-12 col-md-10 m-auto">
            <img src={image} alt={username} style={styleImg} />
            <h4 className="font-weight-bold">{username}</h4>
            <p className="text-muted">{bio}</p>
            <div className="text-right">
              <ButtonFollow profile={profile} className="float-right" />
            </div>
          </div>
        </div>
      </div>
      <div className="container text-center">
        <Feed strFeed={"GlobalFeed"} author={username} />
      </div>
    </>
  );
}

export default withService()(AuthorPage);
