import App from "../components/App";
import Link from "next/link";
import { withApollo } from "../lib/apollo";
import mapValues from "lodash/mapValues";

import EventsByDate from "../components/EventsByDate";
import Seo from "../components/Seo";
import PeriodSelector, { periodsByPath } from "../components/PeriodSelector";
import LogoVorterix from "../components/LogoVorterix";
import Logo from "../components/Logo";

const IndexPage = props => {
  const currentPeriod = periodsByPath[""];

  return (
    <App>
      <Seo title={currentPeriod.name} />
      <div
        className="section has-vertical-scroll-stop"
        style={{
          paddingTop: "1rem",
          paddingBottom: 0
        }}
      >
        <div className="container">
          {/* <div className="columns is-mobile is-vcentered">
            <div className="column is-7-mobile is-10-tablet">
              <PeriodSelector currentPeriod={currentPeriod} />
            </div>
            <div
              className="column is-5-mobile is-2-tablet"
              style={{ paddingTop: 0 }}
            >
              <span style={{ fontSize: "0.6rem" }}>Auspicia</span>
              <a href="https://vorterixbahia.com/" target="_blank">
                <LogoVorterix width="100%" />
              </a>
            </div>
      </div> */}
        </div>
      </div>
      {/* <EventsByDate
        query={currentPeriod.query}
        variables={mapValues(currentPeriod.variables, v =>
          v.format("YYYY-MM-DD")
        )}
      /> */}
      <section className="section">
        <p className="is-size-3 has-text-centered">
          Cuando derrotemos a esta crisis,{" "}
          <Logo fillColor="black" width="120px" /> va a volver con todo.
          <br />
          Mientras tanto…
        </p>
        <h1 className="is-size-1 has-text-centered">#QuedateEnTuCasa</h1>
        <p className="is-size-3 has-text-centered">
          También podés ayudarnos a compilar una gran base de datos de proyectos
          musicales de Bahía Blanca y zona.{" "}
          <Link href="/inscribite">Hacé click acá</Link> y llená el formulario!
        </p>
      </section>
    </App>
  );
};

export default withApollo(IndexPage);
