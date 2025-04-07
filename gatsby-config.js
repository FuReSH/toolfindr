require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});
const siteMetadata = require("./config/siteMetadata");
const plugins = require("./config/plugins");

console.log(`Using path prefix: ${process.env.GATSBY_PATH_PREFIX}`);

module.exports = {
  flags: {
    DEV_SSR: true,
    PRESERVE_FILE_DOWNLOAD_CACHE: true,
  },
  pathPrefix: process.env.GATSBY_PATH_PREFIX,
  siteMetadata,
  plugins,
};
