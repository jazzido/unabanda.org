import App from "../../components/App";
import { withApollo } from "../../lib/apollo";
import { useRouter } from "next/router";
import moment from "moment-timezone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTelegram } from "@fortawesome/free-brands-svg-icons";


import EventsByDate from "../../components/EventsByDate";
import Seo from "../../components/Seo";
import config from "../../lib/config";
import LogoVorterix from "../../components/LogoVorterix";

const DATE_EVENTS_QUERY = `
  query EventsForDate($fecha: String) {
    event(first: 100, sort: hora, filter: { fecha: { eq: $fecha } }) {
      edges {
        node {
          ...EventFields
        }
      }
    }
  }
`;

const FechaPage = (props) => {
  const router = useRouter();
  const { fecha } = router.query;
  // TODO validar fecha con regex, etc

  const mDate = moment(fecha).locale("es");

  return (
    <App>
      <Seo
        title={`Eventos para el ${mDate.format("dddd D [de] MMMM [de] YYYY")}`}
        canonical={`${config.siteUrl}/fecha/${fecha}`}
        openGraph={{
          images: [
            {
              url: `${config.siteUrl}/static/calendars/${mDate.format(
                "MM-DD"
              )}.png`,
              width: 256,
              height: 256,
              alt: "unabanda.org logo",
            },
          ],
        }}
      />
      <div
        className="section has-vertical-scroll-stop
        "
        style={{
          paddingTop: "1rem",
          paddingBottom: 0,
        }}
      >
        <div className="container">
          <div className="columns is-mobile is-vcentered">
            <div className="column is-7-mobile is-10-tablet">
              <a
                href="https://t.me/unabanda"
                target="_blank"
                rel="noreferrer"
                style={{ "font-weight": "bold" }}
              >
                <span style={{ "vertical-align": "super" }}>
                  Suscribite en Telegram!
                </span>
                <FontAwesomeIcon
                  icon={faTelegram}
                  size="2x"
                  style={{ display: "inline-block", color: "rgb(0, 136, 204)" }}
                />
              </a>
            </div>
            <div className="column is-5-mobile is-2-tablet is-size-7 is-size-6-tablet">
              <a href="https://vorterixbahia.com/" target="_blank">
                <LogoVorterix width="100%" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <EventsByDate query={DATE_EVENTS_QUERY} variables={{ fecha }} />
    </App>
  );
};

export default withApollo(FechaPage);
