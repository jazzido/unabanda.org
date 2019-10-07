//const withCSS = require("@zeit/next-css");
const withSass = require("@zeit/next-sass");
const withOffline = require("next-offline");

// HAY UN BUG con la última versión de css-loader, esto lo arregla
function HACK_removeMinimizeOptionFromCssLoaders(config) {
  console.warn(
    "HACK: Removing `minimize` option from `css-loader` entries in Webpack config"
  );
  config.module.rules.forEach(rule => {
    if (Array.isArray(rule.use)) {
      rule.use.forEach(u => {
        if (u.loader === "css-loader" && u.options) {
          delete u.options.minimize;
        }
      });
    }
  });
}

module.exports = withOffline(
  withSass({
    webpack(config) {
      HACK_removeMinimizeOptionFromCssLoaders(config);
      return config;
    }
  })
);

// Este archivo ./node_modules/postcss-preset-env/index.mjs
// quiere importar algo que no puede, esto se supone que lo arregla
// function HACK_MJS_ylaputaquetepario(config) {
//   config.module.rules.push({
//     test: /\.mjs$/,
//     include: /node_modules/,
//     type: "javascript/auto"
//   });
//   console.log(config.module.rules);
// }

// module.exports = {
//   webpack(config) {
//     HACK_MJS_ylaputaquetepario(config);
//     return config;
//   }
// };
