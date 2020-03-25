// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import Document, { Html, Head, Main, NextScript } from "next/document";
import config from "../lib/config";

config.defaultSeo.facebook.appId;

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
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
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
        window.fbAsyncInit = function() {
          FB.init({
            appId      : '${config.defaultSeo.facebook.appId}',
            cookie     : true,
            xfbml      : true,
            version    : 'v4.0'
          });
            
          FB.AppEvents.logPageView();   
            
        };
      
        (function(d, s, id){
           var js, fjs = d.getElementsByTagName(s)[0];
           if (d.getElementById(id)) {return;}
           js = d.createElement(s); js.id = id;
           js.src = "https://connect.facebook.net/en_US/sdk.js";
           fjs.parentNode.insertBefore(js, fjs);
         }(document, 'script', 'facebook-jssdk'));
        `
            }}
          ></script>
          <Main />
          <NextScript />
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "${config.firebase.apiKey}",
    authDomain: "${config.firebase.authDomain}",
    databaseURL: "${config.firebase.databaseURL}",
    projectId: "${config.firebase.projectId}",
    storageBucket: "",
    messagingSenderId: "${config.firebase.messagingSenderId}",
    appId: "${config.firebase.appId}"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);`
            }}
          />
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `

        // Setup a listener to track Add to Homescreen events.
        // window.addEventListener('beforeinstallprompt', function(e) {
        //   e.userChoice.then(function(choiceResult) {
        //     ga('send', 'event', 'A2H', choiceResult.outcome);
        //   });
        // });

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
