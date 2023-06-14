const subscribe = require("../route/subscribe");
const bulkMails = require("../route/bulkMails");
const deleteMail = require("../route/deleteMail");
const {
  subscribeEmail,
  sendBulkMail,
  deleteSubscribeEmail,
} = require("../controller/subscribeControllers");
const error = require("../middleware/error");
const bodyParser = require("body-parser");

module.exports = function (app) {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use("/api/subscribeEmail", subscribeEmail, subscribe);
  app.use("/api/sendBulkMail", sendBulkMail, bulkMails);
  app.use("/api/deleteSubscribeEmail", deleteSubscribeEmail, deleteMail);

  app.use(error);
};
