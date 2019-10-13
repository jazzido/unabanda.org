import { useState } from "react";
import { withApollo } from "../lib/apollo";
import App from "../components/App";
import Header from "../components/Header";

const EnviarEvento = () => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <App>
      <Header />
      <div
        className="container has-vertical-scroll-stop"
        style={{ height: "1600px" }}
      >
        <section className="section" style={{ height: "100%" }}>
          <div className="columns" style={{ height: "100%" }}>
            <div
              className="column is-four-fifths is-centered"
              style={{ height: "100%", position: "relative" }}
            >
              <script src="https://static.airtable.com/js/embed/embed_snippet_v1.js" />
              {isLoading && (
                <div
                  className="loadingspinner"
                  style={{
                    position: "absolute",
                    left: "calc(50% - (2.5em / 2))"
                  }}
                />
              )}
              <iframe
                title="Formulario para enviarnos un evento"
                className="airtable-embed airtable-dynamic-height"
                src="https://airtable.com/embed/shr11GTxHiP0N0a0d?backgroundColor=cyan"
                frameBorder="0"
                width="100%"
                height="1275"
                onLoad={() => setIsLoading(false)}
                style={{
                  background: "transparent",
                  height: "100%"
                }}
              />
            </div>
          </div>
        </section>
      </div>
    </App>
  );
};

export default withApollo(EnviarEvento);
