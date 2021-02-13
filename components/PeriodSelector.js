import Link from "next/link";
import { useState } from "react";
import moment from "moment-timezone";
import keyBy from "lodash/keyBy";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

import config from "../lib/config";

export const FECHA_EQ_QUERY = `
  query EventsForDate($date: String) {
    event(sort: fecha, filter: { fecha: { eq: $date } }) {
      edges {
        node {
          ...EventFields
        }
      }
    }
  }
`;

const FECHA_GTE_QUERY = `
  query EventsForDateAndAfter($date: String) {
    event(sort: fecha, filter: { fecha: {gte: $date} }) {
      edges {
        node {
          ...EventFields
        }
      }
    }
  }
`;

const FECHA_BETWEEN_QUERY = `
  query EventsBetweenDates($fromDate: String, $toDate: String) {
    event(
      sort: fecha
      filter: {fecha: {gte: $fromDate, lte: $toDate} } 
    ) {
      edges {
        node {
          ...EventFields
        }
      }
    }
  }
`;

const today = () => moment().tz(config.timeZone);

export const PERIODS = [
  {
    name: "Esta semana",
    path: "",
    query: FECHA_BETWEEN_QUERY,
    variables: {
      fromDate: today(),
      toDate: today().endOf("isoWeek")
    }
  },
  {
    name: "Hoy",
    path: "hoy",
    query: FECHA_EQ_QUERY,
    variables: {
      date: today()
    }
  },
  {
    name: "Mañana",
    path: "mañana",
    query: FECHA_EQ_QUERY,
    variables: {
      date: today().add(1, "day")
    }
  },
  {
    name: "Este finde",
    path: "finde",
    query: FECHA_BETWEEN_QUERY,
    variables: {
      fromDate: today()
        .endOf("isoWeek")
        .subtract(2, "days"),
      toDate: today().endOf("isoWeek")
    }
  },
  {
    name: "Semana que viene",
    path: "semanaqueviene",
    query: FECHA_BETWEEN_QUERY,
    variables: {
      fromDate: today()
        .add(1, "weeks")
        .startOf("isoWeek"),
      toDate: today()
        .add(1, "weeks")
        .endOf("isoWeek")
    }
  },
  {
    name: "Mes que viene",
    path: "mesqueviene",
    query: FECHA_BETWEEN_QUERY,
    variables: {
      fromDate: today()
        .add(1, "months")
        .startOf("month"),
      toDate: today()
        .add(1, "month")
        .endOf("month")
    }
  },
  {
    name: "Todos los eventos",
    path: "todos",
    query: FECHA_GTE_QUERY,
    variables: {
      date: today()
    }
  }
];

export const periodsByPath = keyBy(PERIODS, "path");

const PeriodSelector = ({ currentPeriod }) => {
  const [isActive, setActive] = useState(false);
  return (
    <div className={`dropdown is-size-4 ${isActive && "is-active"}`}>
      <div className="dropdown-trigger">
        <button
          className="button is-black is-size-5"
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
              style={{ flex: "1 0 auto" }}
            />
          </span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {PERIODS.map(({ name, path }) => {
            return (
              <Link
                href={path === "" ? "/" : "/eventos/[period]"}
                as={path === "" ? "/" : `/eventos/${path}`}
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
