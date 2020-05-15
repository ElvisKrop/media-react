import React from "react";
import { Link } from "react-router-dom";
import "./buttons.css";

const EditArticle = ({ slug }) => {
  return (
    <Link to={`/editor/${slug}`}>
      <button type="button" className="btn-edit">
        <i className="fas fa-pencil-alt" />
        &nbsp;Edit Article
      </button>
    </Link>
  );
};
export default EditArticle;
