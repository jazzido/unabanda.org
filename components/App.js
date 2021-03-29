import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";
import { withRouter } from "next/router";

import "moment/locale/es";

import NotificationPrompt from "./NotificationPrompt";

const FB_PIXEL = `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
 fbq('init', '1325330401172361'); 
fbq('track', 'PageView');
`;

const App = ({ children }) => (
  <main>
    <Head>
      <meta
        name="viewport"
        content="initial-scale=1.0, width=device-width"
        key="viewport"
      />
      <meta name="theme-color" content="#317EFB"/>
      <link 
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Fira+Sans+Condensed&display=swap"
        rel="preload" as="style"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Fira+Sans+Condensed&display=swap"
        media="print" onLoad="this.media='all'" 
      />
      <link rel="manifest" href="/manifest.json" />
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
      <script dangerouslySetInnerHTML={{__html: FB_PIXEL }} />
    </Head>

    {/* <NotificationPrompt /> */}
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
