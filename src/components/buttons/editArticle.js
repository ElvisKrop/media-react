import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./buttons.scss";

const EditArticle = ({ slug }) => (
  <Link to={`/editor/${slug}`}>
    <button type="button" className="btn-edit">
      <i className="fas fa-pencil-alt" />
      &nbsp;Edit Article
    </button>
  </Link>
);

EditArticle.propTypes = {
  slug: PropTypes.string
};

export default EditArticle;
