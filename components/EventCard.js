import Link from "next/link";
import { useState } from "react";

import moment from "moment-timezone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faWhatsapp,
  faTwitter
} from "@fortawesome/free-brands-svg-icons";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton
} from "react-share";

import Ribbon from "./Ribbon";

import { theme } from "../lib/theme";
import config from "../lib/config";

export const RIBBON_CLASSES = {
  0: "hoy",
  1: "maniana"
};

const LittleCalendar = ({ fecha, className, ...props }) => {
  const mFecha = moment(fecha)
    .tz(config.timeZone)
    .locale("es");

  return (
    <div
      className={`little-calendar is-paddingless has-text-centered ${className}`}
      {...props}
    >
      <div className="is-uppercase">
        {mFecha.format("MMM").replace(".", "")}
      </div>
      <div className="is-size-5">{mFecha.format("DD")}</div>
      <style jsx>
        {`
          .little-calendar {
            width: 100%;
          }
          .little-calendar.hoy {
          }
          .little-calendar > div:first-child {
            background-color: black;
            color: white;
            font-weight: bold;
          }
          .little-calendar.hoy > div:first-child {
            background-color: ${theme.colorHoy};
          }
          .little-calendar.maniana > div:first-child {
            background-color: ${theme.colorManiana};
          }
          .little-calendar.despues > div:first-child {
            background-color: ${theme.colorDespues};
          }
        `}
      </style>
    </div>
  );
};

const EventCard = ({ event }) => {
  const currentDate = moment()
    .tz(config.timeZone)
    .startOf("day");
  const eventDate = moment.tz(event.fecha, config.timeZone);

  const daysDiff = eventDate.diff(currentDate, "days");
  const ribbonClass = RIBBON_CLASSES[daysDiff] || "despues";
  const ribbonContent = daysDiff >= 2 ? `${daysDiff} días` : null;

  const eventUrl = `/evento/${event.at_record_id}-${event.slug}`;
  const eventAbsoluteUrl = `${config.siteUrl}${eventUrl}`;

  const [isShareOpen, setIsShareOpen] = useState(false);
  return (
    <div className="card" itemScope itemType="http://schema.org/Event">
      {/* {eventImage} */}
      <div
        className="card-content"
        style={{ padding: "0.5rem", position: "relative" }}
      >
        <Ribbon
          position="top-right"
          className={ribbonClass}
          content={ribbonContent}
        />

        <div className="columns">
          <h2 className="column title is-size-3">
            <Link href="/evento/[slug]" as={`/evento/${event.at_record_id}-${event.slug}`}>
              <a className="has-text-black">
                <span itemProp="name">{event.nombre}</span>
              </a>
            </Link>
          </h2>
        </div>

        <div className="content event-body">
          <p className="is-size-6" style={{lineHeight: 1.2}} itemProp="description">
            {event.cuerpo}
          </p>
        </div>
        <div className="columns is-mobile event-venue">
          {event.venue ? (
            <div
              className="column"
              itemProp="location"
              itemScope
              itemType="http://schema.org/Place"
            >
              <h3 className="title is-size-6" style={{ marginBottom: 0 }}>
                <Link href="/lugar/[slug]" as={`/lugar/${event.venue.at_record_id}-${event.venue.slug}`}>
                  <a>
                    <span itemProp="name">{event.venue.nombre}</span>
                  </a>
                </Link>
              </h3>
              <div
                itemProp="address"
                itemScope
                itemType="http://schema.org/PostalAddress"
              >
                {event.venue.direccion && (
                  <h4
                    className="subtitle is-size-7 has-text-weight-normal"
                    style={{ marginBottom: 0 }}
                    itemProp="streetAddress"
                  >
                    {event.venue.direccion}
                  </h4>
                )}
                <h4
                  itemProp="addressLocality"
                  className="subtitle has-text-weight-normal is-size-7"
                  style={{ marginBottom: 0 }}
                >
                  {event.venue.city.nombre}
                </h4>
                <meta itemProp="addressCountry" content="AR" />
              </div>
            </div>
          ) : null}
          <a
            className="column is-narrow has-text-right has-text-black"
            style={{
              alignSelf: "flex-end",
              cursor: "pointer",
              border: 0
            }}
            onClick={() => setIsShareOpen(!isShareOpen)}
          >
            <span className="icon is-small">
              <FontAwesomeIcon
                icon={faShareAlt}
                size="sm"
                style={{ flex: "1 0 auto", width: "12.26px", height: "14px" }}
              />
            </span>
          </a>

          <div
            className="box share-popup"
            style={{
              visibility: isShareOpen ? "visible" : "hidden"
            }}
          >
            <span className="icon has-text-white">
              <WhatsappShareButton
                url={eventAbsoluteUrl}
                style={{ flex: "1 0 auto" }}
              >
                <FontAwesomeIcon icon={faWhatsapp} size="lg" />
              </WhatsappShareButton>
            </span>
            <span className="icon  has-text-white">
              <FacebookShareButton
                url={eventAbsoluteUrl}
                style={{ flex: "1 0 auto" }}
              >
                <FontAwesomeIcon icon={faFacebook} size="lg" />
              </FacebookShareButton>
            </span>
            <span className="icon  has-text-white">
              <TwitterShareButton
                url={eventAbsoluteUrl}
                style={{ flex: "1 0 auto" }}
              >
                <FontAwesomeIcon icon={faTwitter} size="lg" />
              </TwitterShareButton>
            </span>
          </div>
        </div>
      </div>
      <footer className="card-footer">
        <meta
          itemProp="startDate"
          content={`${moment(event.fecha).format("YYYY-MM-DD")}T${event.hora}`}
        />
        <div className="card-footer-item" style={{ padding: 0 }}>
          <LittleCalendar fecha={event.fecha} className={ribbonClass} />
        </div>
        <div
          className="card-footer-item has-text-weight-semibold is-size-5"
          style={{ padding: 0 }}
        >
          {event.hora}
        </div>
      </footer>
      <style jsx>
        {`
          h2 {
            font-family: "Fira Sans Condensed";
            font-size: 30px;
            letter-spacing: -2px;
          }
          .share-popup {
            width: 110px;
            position: absolute;
            right: 30px;
            bottom: 5px;
            height: 2.5rem;
            padding: 5px !important;
            z-index: 2;
            background-color: #444444 !important;
            display: flex !important;
            justify-content: space-around;
            align-items: flex-end;
          }
          .share-popup * {
            cursor: pointer;
          }
          .icon .fas {
            width: 16px;
            height: 16px;
          }
        `}
      </style>
    </div>
  );
};

export default EventCard;
