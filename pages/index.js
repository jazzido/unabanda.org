import App from "../components/App";
import { withApollo } from "../lib/apollo";
import mapValues from "lodash/mapValues";

import EventsByDate from "../components/EventsByDate";
import Seo from "../components/Seo";
import PeriodSelector, { periodsByPath } from "../components/PeriodSelector";
import LogoVorterix from "../components/LogoVorterix";

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
          <div className="columns is-mobile is-vcentered">
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
          </div>
        </div>
      </div>
      <EventsByDate
        query={currentPeriod.query}
        variables={mapValues(currentPeriod.variables, v =>
          v.format("YYYY-MM-DD")
        )}
      />
    </App>
  );
};

export default withApollo(IndexPage);
