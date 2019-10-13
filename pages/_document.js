// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import Document, { Html, Head, Main, NextScript } from "next/document";
import moment from "moment-timezone";
import config from "../lib/config";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const today = moment()
      .tz(config.timeZone)
      .format("YYYY-MM-DD");
    return { __unabandaToday: today, ...initialProps };
  }

  render() {
    return (
      <Html className="has-navbar-fixed-top">
        <Head>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${config.googleAnalyticsID}`}
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', '${config.googleAnalyticsID}');
                      
            `
            }}
          ></script>
          <script src="https://www.gstatic.com/firebasejs/6.6.1/firebase-app.js" />
          <script src="https://www.gstatic.com/firebasejs/6.6.1/firebase-messaging.js" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBWkPpAtaqQ3ZATPdb0tLyjDqmhKdE2Kjw",
    authDomain: "unabanda-645bd.firebaseapp.com",
    databaseURL: "https://unabanda-645bd.firebaseio.com",
    projectId: "unabanda-645bd",
    storageBucket: "",
    messagingSenderId: "926556883368",
    appId: "1:926556883368:web:82d705585a02c7ffd8f59d"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);`
            }}
          />
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
        if ("serviceWorker" in navigator) {
          navigator.serviceWorker
            .register("/firebase-messaging-sw.js")
            .then(function(registration) {
              console.log("Registration successful, scope is:", registration.scope);
            })
            .catch(function(err) {
              console.log("Service worker registration failed, error:", err);
            });
        }
        `
            }}
          />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
