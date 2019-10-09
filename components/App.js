import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";
import { withRouter } from "next/router";

import NotificationPrompt from "./NotificationPrompt";

const App = ({ children }) => (
  <main>
    <Head>
      <meta
        name="viewport"
        content="initial-scale=1.0, width=device-width"
        key="viewport"
      />
      <link rel="manifest" href="/static/manifest.json" />
      <link rel="shortcut icon" href="/static/icons/icon-48x48.png" />
      <link
        rel="apple-touch-icon"
        sizes="48x48"
        href="/static/icons/icon-48x48.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="72x72"
        href="/static/icons/icon-72x72.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="96x96"
        href="/static/icons/icon-96x96.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="/static/icons/icon-144x144.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="192x192"
        href="/static/icons/icon-192x192.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="256x256"
        href="/static/icons/icon-256x256.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="384x384"
        href="/static/icons/icon-384x384.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="512x512"
        href="/static/icons/icon-512x512.png"
      />
    </Head>

    <NotificationPrompt />
    <Header />
    <div
      style={{
        flex: "1 0 auto",
        minHeight: "calc(90vh - 52px)",
        marginTop: "1rem"
      }}
    >
      {children}
    </div>
    <Footer />
  </main>
);

export default withRouter(App);
