import { useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import moment from "moment-timezone";
import range from "lodash/range";
import groupBy from "lodash/groupBy";
import gql from "graphql-tag";

import { withApollo } from "../lib/apollo";

import App from "../components/App";
import { FECHA_EQ_QUERY } from "../components/PeriodSelector";
import { queryFragments } from "../components/EventsByDate";

const FechaSelector = ({ fechas, selected }) => {
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
          <span>{selected}</span>
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
          {fechas.map(fecha => {
            return (
              <Link href={`/posteo?fecha=${fecha}`} key={fecha}>
                <a
                  className={`dropdown-item is-size-5 ${fecha === selected &&
                    "is-active"}`}
                  onClick={() => setActive(false)}
                >
                  {fecha}
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const eventToText = event => {
  return `${event.venue.nombre}${
    event.venue.direccion ? " (" + event.venue.direccion + ")" : ""
  }: ${event.nombre} - ${event.hora}`;
};

const PosteoPage = props => {
  const router = useRouter();
  let { fecha } = router.query;

  const hoy = moment().startOf("day");

  const fechas = range(10).reduce((memo, d) => {
    return [
      ...memo,
      moment(hoy)
        .add(d, "day")
        .format("YYYY-MM-DD")
    ];
  }, []);

  const date = moment(fecha) || hoy;

  const doQuery = useQuery(
    gql`
      ${FECHA_EQ_QUERY}
      ${queryFragments.eventFields}
    `,
    {
      variables: {
        date: date.format("YYYY-MM-DD")
      },
      notifyOnNetworkStatusChange: true
    }
  );

  const { loading, error, data, fetchMore, networkStatus } = doQuery;

  let content;
  if (loading) {
    content = <div className="loadingspinner"></div>;
  } else if (data) {
    content = (
      <div className="content">
        <p>Agenda unabanda {date.format("dddd D [de] MMMM [de] YYYY")}</p>
        {Object.entries(
          groupBy(data.allEvents.edges, e => e.node.venue.city.nombre)
        ).map(([cityNombre, edges]) => {
          return (
            <p key={cityNombre}>
              {cityNombre}
              <br />
              <ul>
                {edges.map(({ node }) => {
                  return <li key={node.slug}>{eventToText(node)}</li>;
                })}
              </ul>
            </p>
          );
        })}
        <p>
          Entrá a https://unabanda.org/fecha/{date.format("YYYY-MM-DD")} para
          ver más eventos!
        </p>
      </div>
    );
  }

  return (
    <App>
      <div
        className="section has-vertical-scroll-stop"
        style={{
          paddingTop: "1rem",
          paddingBottom: 0
        }}
      >
        <div className="container">
          <div className="columns is-mobile is-vcentered">
            <h2 className="is-narrow">Elegir fecha:</h2>
            <div className="column is-7-mobile is-10-tablet">
              <FechaSelector
                fechas={fechas}
                selected={fecha ? fecha : fechas[0]}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="section has-vertical-scroll-stop">
        <div className="container box">{content}</div>
      </div>
    </App>
  );
};
export default withApollo(PosteoPage);
