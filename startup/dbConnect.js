const mongoose = require("mongoose");
const dbDebugger = require("debug")("app:db");

module.exports = async function () {
  await mongoose.connect(process.env.DB_URI);
  dbDebugger(`connected to ${process.env.DB_URI}`);
};
