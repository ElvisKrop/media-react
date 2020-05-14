import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavPanel from "./navPanel";
import "./header.css";

function Header() {
  const [burgerMenu, setburgerMenu] = useState(false);

  return (
    <>
      <div className="substrate" />
      <header className="fixed-top bg-white border-bottom">
        <div className="container">
          <nav className="navbar navbar-light">
            <Link className="navbar-brand align-self-start" to="/">
              Media React
            </Link>
            <div className="block_toolbar">
              <NavPanel data={{ burgerMenu, setburgerMenu }} />
              <div
                className={burgerMenu ? "burger open" : "burger"}
                onClick={() => setburgerMenu(!burgerMenu)}
              >
                <span></span>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;
