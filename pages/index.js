import App from "../components/App";
import { NextSeo } from "next-seo";
import { withApollo } from "../lib/apollo";

import moment from "moment-timezone";
import config from "../lib/config";

import EventsByDate from "../components/EventsByDate";
import Seo from "../components/Seo";

const ALL_EVENTS_QUERY = `
  query EventsForTodayAndAfter($today:String) {
    allEvents(sort: FECHA_ASC, filters: { fechaGte: $today }) {
      edges {
        node {
          ...EventFields
        }
      }
    }
  }
`;

const IndexPage = props => {
  const today = moment()
    .tz(config.timeZone)
    .format("YYYY-MM-DD");

  return (
    <App>
      <Seo title="Música en vivo en Bahía Blanca y zona" />
      <EventsByDate query={ALL_EVENTS_QUERY} variables={{ today }} />
    </App>
  );
};

export default withApollo(IndexPage);
