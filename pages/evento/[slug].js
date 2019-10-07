import App from "../../components/App";
import { withApollo } from "../../lib/apollo";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import Error from "next/error";
import gql from "graphql-tag";

//import moment from "moment-timezone";
import "moment/locale/es";

//import EventsByDate from "../../components/EventsByDate";
import Seo from "../../components/Seo";
import EventCard from "../../components/EventCard";
import config from "../../lib/config";
import { ID_REGEX } from "../../lib/helpers";
import { queryFragments } from "../../components/EventsByDate";

const EVENT_QUERY = gql`
  query Event($event_id: Int) {
    event(eventId: $event_id) {
      ...EventFields
    }
  }
  ${queryFragments.eventFields}
`;

const EventPage = props => {
  const router = useRouter();
  const { slug } = router.query;
  let event_id;

  const m = slug.match(ID_REGEX);
  if (!m) {
    return <Error statusCode="404" />;
  } else {
    event_id = m[1];
  }

  const query = useQuery(EVENT_QUERY, {
    variables: {
      event_id: event_id
    },
    notifyOnNetworkStatusChange: true
  });
  const { loading, error, data, fetchMore, networkStatus } = query;
  let content;

  if (error) {
    return (
      <section
        className="section events-by-date"
        style={{ paddingTop: "2.5rem" }}
      >
        Error
      </section>
    );
  } else if (loading) {
    content = <div className="loadingspinner" />;
  } else if (!data.event) {
    content = <Error statusCode="404" />;
  } else {
    const { event } = data;
    content = (
      <div className="container">
        <section className="section">
          <div className="columns">
            <div className="column is-half-tablet is-offset-one-quarter-tablet">
              {loading ? (
                <div className="loadingspinner"></div>
              ) : (
                <EventCard event={event} />
              )}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return <App>{content}</App>;
};

export default withApollo(EventPage);
