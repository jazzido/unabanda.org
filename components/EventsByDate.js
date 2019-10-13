import { useRef, useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { NetworkStatus } from "apollo-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import groupBy from "lodash/groupBy";
import sortBy from "lodash/sortBy";
import keys from "lodash/keys";
import gql from "graphql-tag";
import moment from "moment-timezone";

import { theme } from "../lib/theme.js";
import Link from "next/link";
import EventCard from "./EventCard";

export const queryFragments = {
  eventFields: gql`
    fragment EventFields on Event {
      nombre
      fecha
      hora
      cuerpo
      atLastModified
      slug
      venue {
        nombre
        direccion
        instagramUsername
        facebookUrl
        venueId
        slug
        city {
          nombre
        }
      }
    }
  `
};

function getEventsByDate(eventEdges) {
  const byDate = groupBy(eventEdges, eventEdge => eventEdge.node.fecha);
  const dates = sortBy(keys(byDate));
  return dates.reduce((dates, date) => {
    return [
      ...dates,
      {
        date: date,
        events: sortBy(byDate[date].map(event => event.node), "hora")
      }
    ];
  }, []);
}

const CardsContainer = ({ events }) => {
  const scrollingContainer = useRef(null);
  const cardForMeasuring = useRef(null);
  const [showRight, setShowRight] = useState(events.length > 1);
  const [showLeft, setShowLeft] = useState(false);
  const [cardWidth, setCardWidth] = useState(0);
  let isScrolling;

  const measureFirstCard = () => {
    setCardWidth(cardForMeasuring.current.offsetWidth);
  };

  useEffect(() => {
    const container = scrollingContainer.current;
    measureFirstCard();
    const onScroll = () => {
      // Clear our timeout throughout the scroll
      window.clearTimeout(isScrolling);
      isScrolling = setTimeout(() => {
        // Run the callback
        if (container.scrollLeft === 0) {
          setShowLeft(false);
        } else {
          setShowLeft(true);
        }

        const scrollEnded =
          container.scrollWidth - container.scrollLeft ===
          container.clientWidth;
        if (scrollEnded) {
          setShowRight(false);
        } else {
          setShowRight(true);
        }
      }, 66);
    };
    window.addEventListener("resize", measureFirstCard);
    container.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("resize", measureFirstCard);
      container.removeEventListener("scroll", onScroll);
    };
  }, []);
  return (
    <div
      className="has-margin-top-10-mobile"
      style={{
        position: "relative",
        overflowX: "auto"
      }}
    >
      <a
        className="button is-black left is-hidden-tablet"
        style={{
          opacity: 0.4,
          position: "absolute",
          top: "50%",
          zIndex: 10,
          visibility: showLeft ? "visible" : "hidden"
        }}
        onClick={() => (scrollingContainer.current.scrollLeft -= cardWidth)}
      >
        <span className="icon is-small has-text-white">
          <FontAwesomeIcon icon={faArrowLeft} style={{ flex: "1 0 auto" }} />
        </span>
      </a>
      <a
        className="button is-black right is-hidden-tablet"
        style={{
          opacity: 0.4,
          position: "absolute",
          top: "50%",
          right: 0,
          zIndex: 10,
          visibility: showRight ? "visible" : "hidden"
        }}
        onClick={() => (scrollingContainer.current.scrollLeft += cardWidth)}
      >
        <span className="icon is-small has-text-white">
          <FontAwesomeIcon icon={faArrowRight} style={{ flex: "1 0 auto" }} />
        </span>
      </a>
      <div
        className="masonry-with-columns cards-container"
        ref={scrollingContainer}
      >
        {events.map((event, i) => {
          return (
            <div key={i} {...(i === 0 ? { ref: cardForMeasuring } : undefined)}>
              <EventCard event={event} className="masonry-card" />
            </div>
          );
        })}
      </div>
      <style jsx>
        {`
          .button {
            position: absolute;
            top: 50%;
            z-index: 1;
          }
          .button.right {
            right: 0;
          }
        `}
      </style>
    </div>
  );
};

const EventsByDate = ({ style, query, variables = {} }) => {
  const doQuery = useQuery(
    gql`
      ${query}
      ${queryFragments.eventFields}
    `,
    {
      variables,
      notifyOnNetworkStatusChange: true
    }
  );

  const { loading, error, data, fetchMore, networkStatus } = doQuery;

  const loadingMoreEvents = networkStatus === NetworkStatus.fetchMore;

  if (error) {
    return <section className="section events-by-date">Error</section>;
  }
  if (loading && !loadingMoreEvents) {
    return (
      <section
        className="section events-by-date"
        style={{ paddingTop: "2.5rem" }}
      >
        <div className="loadingspinner"></div>
      </section>
    );
  }

  const { edges: allEvents } = data.allEvents;

  return (
    <section className="section events-by-date">
      <div className="container">
        {getEventsByDate(allEvents).map(({ date: dateString, events }) => {
          const mDate = moment(dateString).locale("es");

          return (
            <div
              className="has-margin-bottom-20 has-vertical-scroll-stop"
              key={dateString}
            >
              <h2
                className="is-size-2-tablet is-size-4 has-margin-bottom-20-tablet"
                data-date={mDate.format("YYYY-MM-DD")}
              >
                <Link
                  href={"/fecha/[fecha]"}
                  as={`/fecha/${mDate.format("YYYY-MM-DD")}`}
                >
                  <a className="has-text-black">
                    <span className="is-hidden-mobile">
                      <span className="is-capitalized">
                        {mDate.format("dddd")}
                      </span>{" "}
                      {mDate.format("D [de] MMMM [de] YYYY")}
                    </span>
                    <span className="is-hidden-tablet is-capitalized ">
                      {mDate.format("dddd D/M/YYYY")}
                    </span>
                  </a>
                </Link>
              </h2>
              <CardsContainer events={events} />
            </div>
          );
        })}
      </div>
      {/* <!-- container --> */}

      <style jsx>
        {`
          .events-by-date {
            padding-top: 2.5rem;
            // min-height: 100vh;
          }

          .today {
            background-color: ${theme.colorHoy};
          }
          .tomorrow {
            background-color: ${theme.colorManiana};
          }
          .more {
            background-color: ${theme.colorDespues};
          }
        `}
      </style>
    </section>
  );
};

export default EventsByDate;
