import Link from "next/link";
import App from "../../components/App";
import { withApollo } from "../../lib/apollo";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import Error from "next/error";
import gql from "graphql-tag";
import moment from "moment-timezone";

import "moment/locale/es";

import Seo from "../../components/Seo";
import EventCard from "../../components/EventCard";
import config from "../../lib/config";
import { ID_REGEX } from "../../lib/helpers";
import { queryFragments } from "../../components/EventsByDate";

const EVENT_QUERY = gql`
  query Event($event_id: String) {
    event(filter: { at_record_id: { eq: $event_id } }) {
      nodes {
        ...EventFields
      }
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
    const event  = data.event.nodes[0];
    const mDate = moment(event.fecha).locale("es");

    const title = `${mDate.format("DD/MM")}: ${event.nombre}${(event.venue
      ? " en " + event.venue.nombre
      : "") + (event.venue.city ? " (" + event.venue.city.nombre + ")" : "")}`;
    content = (
      <div className="container">
        <Seo
          title={title}
          canonical={`${config.siteUrl}/evento/${event.at_record_id}-${event.slug}`}
          openGraph={{
            images: [
              {
                url: `${config.siteUrl}/static/calendars/${mDate.format(
                  "MM-DD"
                )}.png`,
                width: 256,
                height: 256,
                alt: mDate.format("D [de] MMMM [de] YYYY"),
              },
            ],
          }}
        />
        <section className="section has-vertical-scroll-stop">
          <div className="columns">
            <div className="column is-half-tablet is-offset-one-quarter-tablet">
              {loading ? (
                <div className="loadingspinner"></div>
              ) : (
                <EventCard event={event} />
              )}
            </div>
          </div>
          <div className="columns">
            <div className="column is-half-tablet is-offset-one-quarter-tablet">
              Ver otros eventos en{" "}
              <Link
                href="/lugar/[slug]"
                as={`/lugar/${event.venue.at_record_id}-${event.venue.slug}`}
              >
                <a>
                  <span itemProp="name">{event.venue.nombre} ({event.venue.city.nombre})</span>
                </a>
              </Link>
            </div>
          </div>
          <div className="columns">
            <div className="column is-half-tablet is-offset-one-quarter-tablet">
              Más eventos el día {" "}
              <Link
                  href={"/fecha/[fecha]"}
                  as={`/fecha/${mDate.format("YYYY-MM-DD")}`}
                >
                <a>
                  <span itemProp="name">{mDate.format("D [de] MMMM [de] YYYY")}</span>
                </a>
              </Link>
            </div>
          </div>          
        </section>
      </div>
    );
  }

  return <App>{content}</App>;
};

export default withApollo(EventPage);
