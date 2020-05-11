import React, { useState, useEffect } from "react";
import Feed from "../../components/feed";
import { ButtonFollow } from "../../components/buttons/index";
import { withService } from "../../hocs";

function AuthorPage({ mrService, username }) {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    mrService.getProfile(username).then((data) => setProfile(data.profile));
  }, [mrService, username]);
  return (
    <>
      <Feed strFeed={"GlobalFeed"} />
      <ButtonFollow profile={profile} username={username} />
      <div>AuthorPage</div>
    </>
  );
}

export default withService()(AuthorPage);
