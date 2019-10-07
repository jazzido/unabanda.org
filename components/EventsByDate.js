import { useRef, useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { NetworkStatus } from "apollo-client";
import _ from "lodash";
import gql from "graphql-tag";
import moment from "moment-timezone";

import "moment/locale/es";

import { theme } from "../lib/theme.js";
import Link from "next/link";
import EventCard from "./EventCard";
import config from "../lib/config";
import { today } from "../lib/helpers";

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
  const byDate = _.groupBy(eventEdges, eventEdge => eventEdge.node.fecha);
  const dates = _.sortBy(_.keys(byDate));
  return dates.reduce((dates, date) => {
    return [
      ...dates,
      {
        date: date,
        events: _.sortBy(byDate[date].map(event => event.node), "hora")
      }
    ];
  }, []);
}

const EventsByDate = ({ style, date, query, variables = {} }) => {
  const currentDate = today();

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

  let stickyEvents;
  const bumperRef = useRef(null);

  const setUpSticky = async () => {
    const { default: StickyEvents } = await import("sticky-events");
    const bumper = bumperRef.current;
    let currentlyStuck = null;

    const onHeaderUnstuck = header => {
      header.classList.remove("today", "tomorrow", "more", "is-stuck");
      bumper.classList.remove("today", "tomorrow", "more", "is-stuck");
    };

    stickyEvents = new StickyEvents({
      enabled: true,
      stickySelector: "h2.sticky-header"
    });

    const { stickyElements, stickySelector } = stickyEvents;

    stickyElements.forEach(sticky => {
      const headerDate = moment(sticky.dataset.date).startOf("day");

      sticky.addEventListener(StickyEvents.CHANGE, event => {
        const { isSticky } = event.detail;
        if (isSticky) {
          if (currentlyStuck) {
            onHeaderUnstuck(currentlyStuck);
          }
          currentlyStuck = sticky;
          sticky.classList.add("is-stuck");
          switch (headerDate.diff(currentDate, "days")) {
            case 0:
              sticky.classList.add("today");
              bumper.classList.add("today");
              break;
            case 1:
              sticky.classList.add("tomorrow");
              bumper.classList.add("tomorrow");
              break;
            default:
              sticky.classList.add("more");
              bumper.classList.add("more");
              break;
          }
        } else if (currentlyStuck === sticky) {
          onHeaderUnstuck(sticky);
          currentlyStuck = null;
        }
      });
    });
  };

  useEffect(() => {
    setUpSticky();
    return () => {
      // clean up sticky events
      if (stickyEvents) {
        stickyEvents.disableEvents();
      }
    };
  }, [data]);

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
    <section
      className="section events-by-date"
      style={{ paddingTop: "2.5rem" }}
    >
      <div className={`sticky-header-bumper is-size-3`} ref={bumperRef} />
      <div className="container">
        {getEventsByDate(allEvents).map(({ date: dateString, events }) => {
          const mDate = moment(dateString).locale("es");

          return (
            <div className="has-margin-bottom-20" key={dateString}>
              <h2
                className="is-size-2-tablet is-size-4 has-margin-bottom-20 sticky-header"
                data-date={mDate.format("YYYY-MM-DD")}
              >
                <Link
                  href={`/fecha/[fecha]`}
                  as={`/fecha/${mDate.format("YYYY-MM-DD")}`}
                >
                  <a>
                    <span className="is-hidden-mobile">
                      <span className="is-capitalized">
                        {mDate.format("dddd")}
                      </span>{" "}
                      {mDate.format("D [de] MMMM [de] YYYY")}
                    </span>
                    <span className="is-hidden-tablet is-capitalized">
                      {mDate.format("dddd D/M/YYYY ")}
                    </span>
                  </a>
                </Link>
              </h2>
              <div className="masonry-with-columns">
                {events.map((event, i) => {
                  return (
                    <div key={i}>
                      <EventCard event={event} className="masonry-card" />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      {/* <!-- container --> */}

      <style jsx>
        {`
          .events-by-date {
            padding-top: 2.5rem;
            min-height: 100vh;
          }

          .masonry-with-columns {
            columns: 5 200px;
            column-gap: 1rem;
          }
          .masonry-with-columns > div {
            margin: 0 1rem 1rem 0;
            display: inline-block;
            width: 100%;
          }

          .sticky-header-bumper {
            background-color: transparent;
            // transition: background-color 0.2s ease;
            position: fixed;
            top: 52px;
            height: 52px;
            left: 0;
            width: 100%;
            pointer-events: none;
            z-index: 5;
            padding-left: 1.5rem;
            padding-right: 1.5rem;
          }

          .sticky-header-bumper a {
            text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
            color: white;
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

          .sticky-header {
            // position: sticky;
            // position: -webkit-sticky;
            top: 52px;
            height: 52px;
            z-index: 20;
            background-color: transparent;

            transition: background-color 0.2s ease;
          }

          .sticky-header.is-stuck {
            top: 47px;
          }

          .sticky-header.is-stuck a {
            text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
            color: white;
          }

          .sticky-header a {
            transition: color 0.1s ease;
            color: black;
          }
        `}
      </style>
    </section>
  );
};

export default EventsByDate;
