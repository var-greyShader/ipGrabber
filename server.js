/*jshint esversion: 6 */
const express = require("express");
const nodemailer = require("nodemailer");
var device = require("express-device");
const si = require("systeminformation");
var fs = require("fs");

const app = express();

app.use(device.capture());

let transport = nodemailer.createTransport({
  host: "smtp.aol.com",
  port: 587,
  auth: {
    user: "yash.aryan",
    pass: "Heropanti@127"
  }
});

var PORT = process.env.PORT || 3000;
app.use(express.static(__dirname + "/public"));

//Managing general routes

app.get("/", function(req, res) {
  var datetime = new Date();
  // const iplocation = require("iplocation").default;
  var ip = req.connection.remoteAddress;
  var infoAll = si
    .cpu()
    .then(data => console.log(data))
    .catch(error => console.error(error));
  var headersAll = JSON.stringify(req.headers);
  var data = `Time Stamp: ${datetime}  \r\n IP Address: ${ip}  \r\n User-Agent: ${req.get(
    "User-Agent"
  )}  \r\n Cache Control Policies: ${req.get(
    "cache-control"
  )} \r\n ${req.device.type.toUpperCase()} \r\n All Device Info: ${infoAll} \r\n \r\n Full Header: ${headersAll} `;
  const message = {
    from: "yash.aryan@aol.com",
    to: "yasharyan307@outlook.com",
    subject: "New Visitor",
    text: `Hi Yash! A new user visited the social support app that you made. Here are the details. \n\r ${data}` // Plain text body
  };
  transport.sendMail(message, function(err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(`Message sent at ${datetime}`);
    }
  });
  res.sendFile(__dirname + "/public/homepage.html");
});

app.get("*", function(req, res) {
  res.sendFile(__dirname + "/public/homepage.html");
});

app.use(
  express.urlencoded({
    extended: true
  })
);

app.listen(PORT);
