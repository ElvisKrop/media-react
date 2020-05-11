import React from "react";
import { Link } from "react-router-dom";

function UserIcon({ data: { image, username, createdAt } }) {
  const style = {
    margin: "5px 6px 0 0",
    height: "32px",
    width: "32px",
    borderRadius: "30px",
  };

  const conversionDate = (createdAt) => {
    const date = new Date(createdAt).toDateString();
    return date.slice(4);
  };

  return (
    <div className="d-flex">
      <Link className="text-primary" to={`/profile/${username}`}>
        <img src={image} style={style} alt={username} />
      </Link>
      <div>
        <Link className="text-primary" to={`/profile/${username}`}>
          {username}
        </Link>
        <p className="text-gray">{conversionDate(createdAt)}</p>
      </div>
    </div>
  );
}

export default UserIcon;