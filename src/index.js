require("dotenv").config();

const db = require("../startup/dbConnect");
db();

const express = require("express");
const serverless = require("serverless-http");
const app = express();

const route = require("../startup/route");
route(app);
const port = require("../startup/portListen");
port(app);

module.exports.handler = serverless(app);
