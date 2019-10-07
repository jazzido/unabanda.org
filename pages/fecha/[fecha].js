import App from "../../components/App";
import { withApollo } from "../../lib/apollo";
import { useRouter } from "next/router";
import moment from "moment-timezone";
import "moment/locale/es";

import EventsByDate from "../../components/EventsByDate";
import Seo from "../../components/Seo";
import config from "../../lib/config";

const DATE_EVENTS_QUERY = `
  query EventsForDate($fecha: String) {
    allEvents(sort: HORA_ASC, filters: { fecha: $fecha }) {
      edges {
        node {
          ...EventFields
        }
      }
    }
  }
`;

const FechaPage = props => {
  const router = useRouter();
  const { fecha } = router.query;
  // TODO validar fecha con regex, etc

  const mDate = moment(fecha);

  return (
    <App>
      <Seo
        title={`Eventos para el ${mDate.format("dddd D [de] MMMM [de] YYYY")}`}
        openGraph={{
          images: [
            {
              url: `${config.siteUrl}/static/calendars/${mDate.format(
                "DD-MM"
              )}.png`,
              width: 256,
              height: 256,
              alt: "unabanda.org logo"
            }
          ]
        }}
      />
      <EventsByDate query={DATE_EVENTS_QUERY} variables={{ fecha }} />
    </App>
  );
};

export default withApollo(FechaPage);
