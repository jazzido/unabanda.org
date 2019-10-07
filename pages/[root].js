import App from "../components/App";
// import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { withApollo } from "../lib/apollo";
import mapValues from "lodash/mapValues";
import keyBy from "lodash/keyBy";

import moment from "moment-timezone";
import config from "../lib/config";

import EventsByDate from "../components/EventsByDate";
import Seo from "../components/Seo";
import PeriodSelector from "../components/PeriodSelector";

const FECHA_EQ_QUERY = `
  query EventsForDate($date: String) {
    allEvents(sort: FECHA_ASC, filters: { fecha: $date }) {
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
    allEvents(sort: FECHA_ASC, filters: { fechaGte: $date }) {
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
    allEvents(
      sort: FECHA_ASC
      filters: { and: { fechaGte: $fromDate, fechaLte: $toDate } }
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
    name: "Este fin de semana",
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
    name: "Todos",
    path: "todos",
    query: FECHA_GTE_QUERY,
    variables: {
      date: today()
    }
  }
];

const periodsByPath = keyBy(PERIODS, "path");

export default withApollo(props => {
  const router = useRouter();
  let { root } = router.query;
  if (!root) {
    root = "";
  }

  const currentPeriod = periodsByPath[root];
  if (!currentPeriod) {
    return <Error statusCode="404" />;
  }

  return (
    <App>
      <Seo title="Música en vivo en Bahía Blanca y zona" />
      <div className="section" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div className="container">
          <PeriodSelector currentPeriod={currentPeriod} />
        </div>
      </div>
      <EventsByDate
        query={currentPeriod.query}
        variables={mapValues(currentPeriod.variables, v =>
          v.format("YYYY-MM-DD")
        )}
      />
    </App>
  );
});
