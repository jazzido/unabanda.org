import App from "../../components/App";
import Error from "next/error";
import { withApollo } from "../../lib/apollo";
import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";

import gql from "graphql-tag";

import EventsByDate from "../../components/EventsByDate";
import Seo from "../../components/Seo";
import { today } from "../../lib/helpers";

const VENUE_EVENTS_QUERY = `
  query EventsForVenue($venue_at_record_id: String, $today: String) {
    allEvents(
      sort: FECHA_ASC
      filters: { venueAtRecordId: $venue_at_record_id, fechaGte: $today }
    ) {
      edges {
        node {
          ...EventFields
        }
      }
    }
  }
`;

const VENUE_QUERY = gql`
  query Venue($venue_id: Int) {
    venue(venueId: $venue_id) {
      nombre
      direccion
      instagramUsername
      facebookUrl
      atRecordId
      city {
        nombre
      }
    }
  }
`;

const ID_REGEX = /.*-(\d+)$/;

const LugarPage = props => {
  const router = useRouter();
  const { slug } = router.query;
  let lugar_id;

  const m = slug.match(ID_REGEX);
  if (!m) {
    return <Error statusCode="404" />;
  } else {
    lugar_id = m[1];
  }

  const query = useQuery(VENUE_QUERY, {
    variables: {
      venue_id: lugar_id
    },
    notifyOnNetworkStatusChange: true
  });
  const { loading, error, data, fetchMore, networkStatus } = query;

  if (error) {
    return (
      <section
        className="section events-by-date"
        style={{ paddingTop: "2.5rem" }}
      >
        Error
      </section>
    );
  }
  if (loading) {
    return (
      <section
        className="section events-by-date"
        style={{ paddingTop: "2.5rem" }}
      >
        <div className="loadingspinner"></div>
      </section>
    );
  }

  const { venue } = data;

  if (!venue) {
    return <Error statusCode="404" />;
  }

  return (
    <App>
      <Seo title={`Eventos en ${venue.nombre} (${venue.city.nombre})`} />
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container ">
          <div
            className="columns has-margin-bottom-10 is-vcentered"
            style={{ alignItems: "flex-end" }}
          >
            <div className="column">
              <h3 className="subtitle is-size-5-mobile">Eventos en</h3>
              <h2 className="title is-size-2-mobile is-size-2">
                {venue.nombre}{" "}
                {venue.instagramUsername ? (
                  <a
                    href={`https://instagram.com/${venue.instagramUsername}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="icon">
                      <FontAwesomeIcon icon={faInstagram} size="sm" />
                    </span>
                  </a>
                ) : (
                  ""
                )}{" "}
                {venue.facebookUrl ? (
                  <span className="icon">
                    <a
                      href={venue.facebookUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="icon"
                    >
                      <FontAwesomeIcon icon={faFacebookSquare} size="sm" />
                    </a>
                  </span>
                ) : (
                  ""
                )}
              </h2>
              <h3 className="subtitle is-size-4  is-size-5-mobile">
                {venue.direccion ? `${venue.direccion} ∙` : null}{" "}
                {venue.city && venue.city.nombre}
              </h3>
            </div>
          </div>
        </div>
      </section>
      <EventsByDate
        query={VENUE_EVENTS_QUERY}
        variables={{
          venue_at_record_id: venue.atRecordId,
          today: today()
        }}
      />
    </App>
  );
};

export default withApollo(LugarPage);
