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
import { ID_REGEX, today } from "../../lib/helpers";
import config from "../../lib/config";

const VENUE_EVENTS_QUERY = `
  query EventsForVenue($venue_at_record_id: String, $today: String) {
    event (
      sort: fecha,
      filter: { venue: { eq: $venue_at_record_id }, fecha: {gte: $today} }
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
  query Venue($venue_id: String) {
    venue(filter: { at_record_id: { eq: $venue_id } }) {
      nodes {
        nombre
        direccion
        instagram_username
        facebook_url
        at_record_id
        slug
        city {
          nombre
        }
      }
    }
  }
`;

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
  const { loading, error, data /*, fetchMore, networkStatus */ } = query;
  let content;

  if (error) {
    console.log(error);
    content = (
      <section
        className="section events-by-date"
        style={{ paddingTop: "2.5rem" }}
      >
        Error
      </section>
    );
  } else if (loading) {
    content = (
      <section
        className="section events-by-date"
        style={{ paddingTop: "2.5rem" }}
      >
        <div className="loadingspinner"></div>
      </section>
    );
  } else if (data.venue && data.venue.nodes.length === 0) {
    content = <Error statusCode={404} />;
  } else {
    
    const venue = data.venue.nodes[0];
    content = (
      <div>
        <Seo 
          title={`Eventos en ${venue.nombre} (${venue.city.nombre})`}
          canonical={`${config.siteUrl}/evento/${venue.at_record_id}-${venue.slug}`}
        />
        <section
          className="section has-vertical-scroll-stop"
          style={{ paddingBottom: 0 }}
        >
          <div
            className="container"
            itemScope
            itemType="http://schema.org/Place"
          >
            <div
              className="columns has-margin-bottom-10 is-vcentered"
              style={{ alignItems: "flex-end" }}
            >
              <div className="column">
                <h3 className="subtitle is-size-5-mobile">Eventos en</h3>
                <h2 className="title is-size-2-mobile is-size-1">
                  <span itemProp="name">{venue.nombre}</span>{" "}
                  {venue.instagram_username ? (
                    <a
                      href={`https://instagram.com/${venue.instagram_username}`}
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
                  {venue.facebook_url ? (
                    <span className="icon">
                      <a
                        href={venue.facebook_url}
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
                <h3
                  className="subtitle is-size-4 is-size-5-mobile"
                  itemProp="address"
                  itemScope
                  itemType="http://schema.org/PostalAddress"
                >
                  {venue.direccion ? (
                    <span>
                      <span itemProp="streetAddress">{venue.direccion}</span> •
                    </span>
                  ) : null}{" "}
                  {venue.city && (
                    <span itemProp="addressLocality">{venue.city.nombre}</span>
                  )}
                  <meta itemProp="addressCountry" content="AR" />
                </h3>
              </div>
            </div>
          </div>
        </section>
        <EventsByDate
          query={VENUE_EVENTS_QUERY}
          variables={{
            venue_at_record_id: venue.at_record_id,
            today: today()
          }}
          groupByCity={false}
        />
      </div>
    );
  }

  return <App>{content}</App>;
};

export default withApollo(LugarPage);
