import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./userIcon.scss";

function UserIcon({ image, username, createdAt }) {
  const conversionDate = (createdAt) => {
    const date = new Date(createdAt).toDateString();
    return date.slice(4);
  };

  return (
    <div className="d-flex overflow-hidden mx-1">
      <Link className="text-primary" to={`/profile/${username}`}>
        <img src={image} className="user-icon-img" alt={username} />
      </Link>
      <div>
        <Link className="text-primary" to={`/profile/${username}`}>
          {username}
        </Link>
        <p className="text-gray mb-0">{conversionDate(createdAt)}</p>
      </div>
    </div>
  );
}

UserIcon.propTypes = {
  image: PropTypes.string,
  username: PropTypes.string,
  createdAt: PropTypes.string
};

export default UserIcon;
