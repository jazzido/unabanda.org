import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTelegram } from "@fortawesome/free-brands-svg-icons";

import Logo from "./Logo.js";
// import Search from "./Search";
const Header = () => {
  const [navBarActive, setNavBarActive] = useState(false);
  return (
    <nav
      className={"navbar is-black has-text-white is-fixed-top"}
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
          onClick={(e) => {
            e.stopPropagation();
            setNavBarActive(!navBarActive);
          }}
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
          <div className="navbar-item">
            <div className="buttons">
              <a className="has-text-white link-telegram" href="https://t.me/unabanda" target="_blank" rel="noreferrer">
                <strong style={{"verticalAlign": "super"}}>Suscribite en Telegram!</strong>
                <FontAwesomeIcon
                  icon={faTelegram}
                  size="2x"
                  style={{ display: "inline", color: "rgb(0, 136, 204)", height: "33px", width: "33px" }}
                />
              </a>
            </div>
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
