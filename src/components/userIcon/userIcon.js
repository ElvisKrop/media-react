import React from "react";
import { Link } from "react-router-dom";
import "./userIcon.scss";

function UserIcon({ image, username, createdAt }) {
  const conversionDate = (createdAt) => {
    const date = new Date(createdAt).toDateString();
    return date.slice(4);
  };

  return (
    <div className="d-flex overflow-hidden">
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

export default UserIcon;
