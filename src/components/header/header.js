import React from "react";
import { Link } from "react-router-dom";
import { withToken } from "../../hocs";

export default function Header() {
  return (
    <nav className="navbar navbar-light">
      <Link className="navbar-brand" to="/">
        Media React
      </Link>
      <NavPanel />
    </nav>
  );
}

const NavPanel = withToken(navPanel);

function navPanel({ isToken }) {
  const privateUl = (
    <>
      <li className="nav-item">
        <Link className="nav-link" to="/editor">
          New Article
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/settings">
          setting
        </Link>
      </li>
    </>
  );
  const publicUl = (
    <>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Sign in
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/register">
          Sign up
        </Link>
      </li>
    </>
  );
  return (
    <ul className="nav pull-xs-right">
      <li className="nav-item">
        <Link className="nav-link" to="/">
          Home
        </Link>
      </li>
      {isToken ? privateUl : publicUl}
    </ul>
  );
}
