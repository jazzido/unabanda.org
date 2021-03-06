//const withCSS = require("@zeit/next-css");

if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}
const webpack = require("webpack");
const withOffline = require("next-offline");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
});

const siteConfig = require("./lib/config.js");

const config = withBundleAnalyzer(
    withOffline({
      target: "serverless",
      generateInDevMode: false,
      generateSw: true,
      workboxOpts: {
        swDest: "static/service-worker.js",
        exclude: [
          /\.(?:png|jpg|jpeg|svg)$/,
          /build-manifest\.json$/,
          /react-loadable-manifest\.json$/
        ],
        runtimeCaching: [
          {
            urlPattern: /^https?.*/,
            handler: "NetworkFirst",
            options: {
              cacheName: "https-calls",
              networkTimeoutSeconds: 15,
              expiration: {
                maxEntries: 150,
                maxAgeSeconds: 30 * 24 * 60 * 60 // 1 month
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      },
      env: {
        FIREBASE_DATABASE_URL: siteConfig.firebase.databaseURL,
        FIREBASE_COLLECTION: siteConfig.firebase.subscribersCollection,
        FIREBASE_MESSAGING_TOPIC: siteConfig.firebase.messagingTopic
      },
      webpack(config) {
        return {
          ...config,
          plugins: [
            ...config.plugins,
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
          ]
        };
      }
    })
);

module.exports = config;
