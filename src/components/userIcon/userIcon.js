import React from "react";
import { Link } from "react-router-dom";

function UserIcon({ data: { image, username, createdAt } }) {
  function conversionDate(createdAt) {
    const date = new Date(Date.parse(createdAt));
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return `${
      months[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
  }

  const style = {
    margin: "5px 6px 0 0",
    height: "32px",
    width: "32px",
    borderRadius: "30px",
  };

  return (
    <div className="d-flex">
      <Link className="text-primary" to={`/profile/${username}`}>
        <img src={image} style={style} />
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
