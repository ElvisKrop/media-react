import React from "react";
import { Link } from "react-router-dom";
const Footer = () => (
  <footer>
    <div className="container py-3">
      <Link className="logo-font font-weight-bold pr-3" to="/">
        Media React
      </Link>
      <span
        className="attribution text-muted font-weight-lighter"
        style={{ fontSize: ".8rem" }}>
        &#169; 2020. An interactive learning project
      </span>
    </div>
  </footer>
);

export default Footer;
