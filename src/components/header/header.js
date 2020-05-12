import React from "react";
import { Link } from "react-router-dom";
import { withToken } from "../../hocs";
import { connect } from "react-redux";

function Header() {
  return (
    <div className="container">
      <nav className="navbar navbar-light">
        <Link className="navbar-brand" to="/">
          Media React
        </Link>
        <NavPanel />
      </nav>
    </div>
  );
}

const mapStateToProps = ({ user }) => ({
  username: user.username
});

const NavPanel = connect(mapStateToProps)(withToken(navPanel));

function navPanel({ isToken, username }) {
  const privateUl = (
    <>
      <li className="nav-item">
        <Link className="nav-link" to="/editor">
          <i class="far fa-clipboard pr-1"></i>
          <span>New Article</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/settings">
          <i className="fas fa-cog pr-1"></i>
          <span>Setting</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to={`/profile/${username}`}>
          {username}
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

export default Header;
