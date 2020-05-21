import React, { useState, useEffect } from "react";
import { withService, withToken } from "../../hocs";
import { Link } from "react-router-dom";
import MiniSpinner from "../mini-spinner";
import "./buttons.scss";

function ButtonFollow({ mrService, isToken, profile, onChange }) {
  const { username, following, loadFollow } = profile;
  const [follow, setFollow] = useState(following);
  const [loading, setLoading] = useState(loadFollow);
  const [widthBtn, setWidthBtn] = useState(0);
  const ref = React.createRef();

  useEffect(() => {
    setFollow(following);
    setLoading(loadFollow);
  }, [following, loadFollow]);

  useEffect(() => {
    if (ref.current !== null) setWidthBtn(ref.current.offsetWidth);
  }, [ref]);

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
    if (onChange) onChange("follow");
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
      <button
        type="button"
        className="btn-follow"
        style={{ minWidth: widthBtn + "px" }}
      >
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
        ref={ref}
      >
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
