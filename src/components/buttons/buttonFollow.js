import React, { useState } from "react";
import { withService, withToken } from "../../hocs";
import { Link } from "react-router-dom";
import MiniSpinner from "../mini-spinner";
import "./buttons.css";

function ButtonFollow({ mrService, isToken, profile }) {
  const { username, following } = profile;

  let [follow, setFollow] = useState(following);
  const [loading, setLoading] = useState(false);

  // TODO при загрузке страницы follow почему то равен undefined?
  if (follow === undefined) {
    follow = following;
  }

  function toggleFollow(username) {
    setLoading(true);
    if (!follow) {
      mrService
        .postFollowig(username)
        .then(updateFollow)
        .catch((error) => console.error(error));
      // TODO обработать ошибки, как нибудь
    } else {
      mrService
        .deleteFollowig(username)
        .then(updateFollow)
        .catch((error) => console.error(error));
      // TODO обработать ошибки, как нибудь
    }
  }

  function updateFollow({ profile }) {
    setFollow(profile.following);
    setLoading(false);
  }

  let textBtn = ` Follow ${username}`;
  let classSVG = "fas fa-plus";

  if (follow) {
    textBtn = ` Unfollow ${username}`;
    classSVG = "fas fa-minus";
  }

  if (loading) {
    return (
      <button type="button" className="btn-follow">
        <MiniSpinner />
      </button>
    );
  }

  if (isToken) {
    return (
      <button
        type="button"
        className="btn-follow"
        onClick={() => toggleFollow(username)}
      >
        <i className={classSVG}></i>
        {textBtn}
      </button>
    );
  }

  return (
    <Link to="/login">
      <button type="button" className="btn-follow">
        <i className={classSVG}></i>
        {textBtn}
      </button>
    </Link>
  );
}

export default withService()(withToken(ButtonFollow));
