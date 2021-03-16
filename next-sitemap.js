module.exports = {
  siteUrl: "https://unabanda.org",
  generateRobotsTxt: true, // (optional)
  exclude: ["server-sitemap.xml", "posteo"],
  robotsTxtOptions: {
    additionalSitemaps: [
      "https://unabanda.org/server-sitemap.xml"
    ]
  }
  // ...other options
}