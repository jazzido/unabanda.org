import { useState, useEffect } from "react";
import Link from "next/link";
import moment from "moment-timezone";
import fetch from "isomorphic-unfetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTelegram, faFacebook
} from "@fortawesome/free-brands-svg-icons";

import "moment/locale/es";

import config from "../lib/config";

const Footer = () => {
  const [lastModified, setLastModified] = useState();
  const [loading, setLoading] = useState(true);
  const error = false;
  
  useEffect(() => {
    let response;
    const fetchData = async () => {
      response = await fetch(`${config.apiEndpoint}/unabanda/last_modified.json`);
      const json = await response.json();
      setLastModified(json.rows[0][0]);
      setLoading(false);
    }
    fetchData();
  }, []);

  const content =
    loading || error ? (
      <span className="loadingspinner" style={{ width: 15, height: 15 }} />
    ) : (
      moment(lastModified)
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
        <div className="columns has-text-centered">
          <div className="column is-narrow has-text-centered">
            <a href="https://facebook.com/unabandaorg" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faFacebook} size="2x" /> facebook.com/unabandaorg</a>
          </div>
          <div className="column is-narrow has-text-centered">
            <a href="https://t.me/unabanda" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faTelegram} size="2x" /> t.me/unabanda</a>
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
