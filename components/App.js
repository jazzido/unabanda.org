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
    </Head>

    <NotificationPrompt />

    <Header />
    <div
      style={{
        flex: "1 0 auto",
        minHeight: "100vh"
      }}
    >
      {children}
    </div>
    <Footer />

    <style jsx global>
      {`
        html {
          height: 100%;
          width: 100%;
        }

        body {
          min-height: 100%;
        }

        body {
          background-color: rgb(233, 233, 233);
          // min-height: 100%;
        }

        main {
          display: flex;
          flex-direction: column;
          align-items: stretch;
        }

        .loadingspinner {
          pointer-events: none;
          width: 2.5em;
          height: 2.5em;
          border: 0.4em solid transparent;
          border-color: #eee;
          border-top-color: #3e67ec;
          border-radius: 50%;
          animation: loadingspin 1s linear infinite;
          display: inline-block;
        }

        @keyframes loadingspin {
          100% {
            transform: rotate(360deg);
          }
        }

        .navbar-menu.is-active .link-acercade {
          color: black !important;
        }

        .loadingspinner {
          margin: 0 auto;
          pointer-events: none;
          width: 5.5em;
          height: 5.5em;
          border: 0.6em solid transparent;
          border-color: #eee;
          border-top-color: #3e67ec;
          border-radius: 50%;
          -webkit-animation: loadingspin 1s linear infinite;
          animation: loadingspin 1s linear infinite;
          display: block;
        }

        @keyframes loadingspin {
          100% {
            transform: rotate(360deg);
          }
        }
      `}
    </style>
  </main>
);

export default withRouter(App);
