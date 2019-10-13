import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Link from "next/link";
import moment from "moment-timezone";
import "moment/locale/es";

import config from "../lib/config";

const Footer = props => {
  const doQuery = useQuery(
    gql`
      {
        lastModified
      }
    `,
    {
      notifyOnNetworkStatusChange: true
    }
  );

  const { loading, error, data, fetchMore, networkStatus } = doQuery;

  const content =
    loading || error ? (
      <div className="loadingspinner" style={{ width: 15, height: 15 }} />
    ) : (
      moment(data.lastModified)
        .tz(config.timeZone)
        .locale("es")
        .format("dddd D [de] MMMM [de] YYYY [a las] HH:MM")
    );

  return (
    <div className="footer has-vertical-scroll-stop">
      <div className="content has-text-centered">
        <p>
          Última actualización: <strong>{content}</strong>
        </p>
        <div className="columns">
          <div className="column is-2 is-offset-2" />
          <div className="column is-narrow has-text-centered">
            <a> Recibir notificaciones</a>
          </div>
          <div className="column is-narrow has-text-centered">
            <Link href="/acercade">
              <a>
                Acerca de <strong>unabanda</strong>
              </a>
            </Link>
          </div>
          <div className="column is-narrow has-text-centered">
            <Link href="/enviarevento">
              <a>Envianos info de tu evento</a>
            </Link>
          </div>
        </div>
        <p>
          contacto: <strong>hola@unabanda.org</strong>
        </p>
        <p>
          <a
            rel="license"
            href="http://creativecommons.org/licenses/by-sa/4.0/"
          >
            <img
              alt="Licencia Creative Commons"
              src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png"
            />
          </a>
          <br />
          Esta obra está bajo una{" "}
          <a
            rel="license"
            href="http://creativecommons.org/licenses/by-sa/4.0/"
          >
            Licencia Creative Commons Atribución-CompartirIgual 4.0
            Internacional
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
