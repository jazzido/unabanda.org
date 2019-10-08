import Link from "next/link";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

import { PERIODS } from "../pages/[root]";

const PeriodSelector = ({ currentPeriod }) => {
  const [isActive, setActive] = useState(false);
  return (
    <div className={`dropdown is-size-3 ${isActive && "is-active"}`}>
      <div className="dropdown-trigger">
        <button
          className="button is-size-5"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setActive(!isActive)}
        >
          <span>{currentPeriod.name}</span>
          <span className="icon is-size-7">
            <FontAwesomeIcon
              icon={faAngleDown}
              aria-hidden="true"
              color="grey"
            />
          </span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {PERIODS.map(({ name, path }) => {
            return (
              <Link
                href={path === "" ? "/" : "/[root]"}
                as={`/${path}`}
                key={path}
              >
                <a
                  className={`dropdown-item is-size-5 ${currentPeriod.path ===
                    path && "is-active"}`}
                  onClick={() => setActive(false)}
                >
                  {name}
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PeriodSelector;
