import React, { useState, useEffect } from "react";
import { withService, withToken } from "../../hocs";
import { Link } from "react-router-dom";
import "./buttons.css";

function ButtonFollow({ mrService, isToken, profile, onChange }) {
  const { username, following } = profile;

  const [follow, setFollow] = useState(following);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFollow(following);
  }, [following]);

  function toggleFollow(username) {
    setLoading(true);
    if (!follow) {
      mrService
        .postFollowig(username)
        .then(updateFollow)
        .catch((error) => console.error(error));
    } else {
      mrService
        .deleteFollowig(username)
        .then(updateFollow)
        .catch((error) => console.error(error));
    }
  }

  function updateFollow({ profile }) {
    setFollow(profile.following);
    setLoading(false);
    if (onChange) onChange();
  }

  let textBtn = ` Follow ${username}`;
  let classSVG = "fas fa-plus";

  if (follow) {
    textBtn = ` Unfollow ${username}`;
    classSVG = "fas fa-minus";
  }

  if (isToken) {
    return (
      <button
        type="button"
        className="btn-follow"
        onClick={() => toggleFollow(username)}>
        <i className={classSVG} />
        {textBtn}
      </button>
    );
  }

  return (
    <Link to="/login">
      <button type="button" className="btn-follow">
        <i className={classSVG} />
        {textBtn}
      </button>
    </Link>
  );
}

export default withService()(withToken(ButtonFollow));
