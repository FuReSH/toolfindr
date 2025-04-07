const path = require("path");

module.exports = [
  {
    name: `images`,
    path: path.join(__dirname, `../static/images`),
  },
  {
    name: `data`,
    path: path.join(__dirname, `../data`),
    ignore: [`**/.*`],
    fastHash: true,
  },
  {
    name: `content`,
    path: path.join(__dirname, `../src/content`),
  },
];
