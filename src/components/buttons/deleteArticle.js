import React from "react";
import { Link } from "react-router-dom";

const DeleteArticle = () => {
  return (
    <button className="btn btn-outline-success">
      <Link to="/">
        <i className="fas fa-trash"></i>
        &nbsp; Delete article
      </Link>
    </button>
  );
};

export default DeleteArticle;
