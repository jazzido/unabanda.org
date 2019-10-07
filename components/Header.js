import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import Logo from "./Logo.js";
import Search from "./Search";

const Header = ({ isAdmin }) => {
  const [navBarActive, setNavBarActive] = useState(false);
  const backgroundColor = isAdmin ? "danger" : "black";
  return (
    <nav
      className={`navbar has-background-${backgroundColor} has-text-white is-fixed-top`}
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand is-size-4">
        <Link href="/">
          <a className="navbar-item has-text-white has-text-weight-bold">
            <Logo />
          </a>
        </Link>{" "}
        <a
          role="button"
          className={`navbar-burger burger ${navBarActive ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          onClick={() => setNavBarActive(!navBarActive)}
          style={{ color: "#fafafa" }}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>

      <div
        id="navbarBasicExample"
        className={`navbar-menu ${navBarActive ? "is-active" : ""}`}
      >
        <div className="navbar-end">
          <div className="navbar-item" style={{ position: "relative" }}>
            <p className="control has-icons-right">
              <input
                className="input"
                type="search"
                placeholder="Buscar eventos…"
              />
              <span className="icon is-small is-right">
                <FontAwesomeIcon icon={faSearch} />
              </span>
            </p>
            {/* <Search
              style={{ position: "absolute", top: 52, right: 12, width: 300 }}
            /> */}
          </div>

          <div className="navbar-item">
            <div className="buttons">
              <Link href="/acercade">
                <a className="has-text-white link-acercade">
                  <strong>Acerca de la agenda</strong>
                </a>
              </Link>
            </div>
          </div>
          <div className="navbar-item">
            <div className="buttons">
              <Link href="/enviarevento">
                <a className="button is-warning">
                  <strong>Enviar evento</strong>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
