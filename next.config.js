const withPWA = require("next-pwa");
// this function will register service worker at production
module.exports = withPWA({
  pwa: {
    dest: "public",
    disable: process.env.NODE_ENV === "development",
  },
});
