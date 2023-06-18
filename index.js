require("dotenv").config();
const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");

const {
  subscribeEmail,
  getSubscribeEmail,
  sendBulkMail,
  deleteSubscribeEmail,
} = require("./controller/subscribeControllers");
const subscribe = require("./route/subscribe");
const bulkMails = require("./route/bulkMails");
const deleteMail = require("./route/deleteMail");
const error = require("./middleware/error");

const app = express();
app.use(bodyParser.json());

app.use("/api/subscribeEmail", subscribeEmail, subscribe);
app.use("/api/getSubscribeEmail", getSubscribeEmail, subscribe);
app.use("/api/subscribeEmail", subscribeEmail, subscribe);
app.use("/api/sendBulkMail", sendBulkMail, bulkMails);
app.use("/api/deleteSubscribeEmail", deleteSubscribeEmail, deleteMail);

app.use(error);

const port = process.env.PORT || 8000;

(async function () {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log(`DB successfully connected to ${process.env.DB_URI}`);

    app.listen(port, () => {
      console.log(`listening to port ${port}`);
    });
  } catch (err) {
    console.error(err, err.message, "MESSAGE: DB connection failed!!!!");
  }
})();
