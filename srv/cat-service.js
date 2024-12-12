const cds = require("@sap/cds");
const entities = cds.entities();

module.exports = cds.service.impl(async (srv) => {
  srv.on("buyBook", entities.Books, async (req) => {
    console.log("buying book");
  });

  srv.on("getStock", entities.Books, async (req) => {
    console.log("get book stock");
  });

  srv.on("calculateTotalStock", async (req) => {
    console.log("get book stock");
  });

  srv.on("resetAllBooks", async (req) => {
    console.log("get book stock");
  });
});
