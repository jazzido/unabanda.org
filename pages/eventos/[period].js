import App from "../../components/App";
import { useRouter } from "next/router";
import { withApollo } from "../../lib/apollo";
import Error from "next/error";
import mapValues from "lodash/mapValues";

import EventsByDate from "../../components/EventsByDate";
import Seo from "../../components/Seo";
import PeriodSelector, { periodsByPath } from "../../components/PeriodSelector";
import LogoVorterix from "../../components/LogoVorterix";

const PeriodPage = props => {
  const router = useRouter();
  let { period } = router.query;

  const currentPeriod = periodsByPath[period];
  if (!currentPeriod) {
    return <Error statusCode="404" />;
  }

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
            <div className="column is-5-mobile is-2-tablet">
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
export default withApollo(PeriodPage);
