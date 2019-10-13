const SITE_NAME = "unabanda";
const SITE_TITLE_ALT = "Agenda de música en vivo en Bahía Blanca y zona";
const SITE_URL = "https://unabanda.org";
const SITE_DESCRIPTION =
  "unabanda.org: La agenda más completa de música en vivo de Bahía Blanca y zona";

const config = {
  siteTitle: SITE_NAME, // Site title.
  siteTitleShort: SITE_NAME, // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation.
  siteTitleAlt: SITE_TITLE_ALT, // Alternative site title for SEO.
  // siteLogo: "/logos/logo-1024.png", // Logo used for SEO and manifest.
  siteUrl: SITE_URL, // Domain of your website without pathPrefix.
  siteDescription: SITE_DESCRIPTION, // Website description used for RSS feeds/meta description tag.
  googleAnalyticsID: "UA-148392594-1", // GA tracking ID.
  firebase: {
    apiKey: "AIzaSyBWkPpAtaqQ3ZATPdb0tLyjDqmhKdE2Kjw",
    authDomain: "unabanda-645bd.firebaseapp.com",
    databaseURL: "https://unabanda-645bd.firebaseio.com",
    projectId: "unabanda-645bd",
    messagingSenderId: "926556883368",
    appid: "1:926556883368:web:82d705585a02c7ffd8f59d",
    subscribersCollection: "notification_subscribers",
    messagingTopic: "publicaciones_agenda"
  },
  timeZone: "America/Argentina/Buenos_Aires",
  //graphQLEndpoint: "http://localhost:5000/graphql",
  graphQLEndpoint: "https://unabandaql.nerdpower.org/graphql",
  defaultSeo: {
    titleTemplate: "%s • unabanda.org",
    facebook: {
      appId: "1235974593277645"
    },
    openGraph: {
      title: `${SITE_NAME} • ${SITE_TITLE_ALT}`,
      description: SITE_DESCRIPTION,
      images: [
        {
          url: `${SITE_URL}/static/logo-256.png`,
          width: 256,
          height: 256,
          alt: "unabanda.org logo"
        }
      ],
      site_name: SITE_NAME
    }
  }
};

module.exports = config;

// export default config;
