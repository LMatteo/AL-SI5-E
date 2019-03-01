var path = require("path");
var cors = require('cors');

const express = require('express');
const app = express();
const pathFile = __dirname;
app.use(cors());

//API css and js files
app.get('/blablamove/interfaceClient.js', function (req, res) {
    res.sendFile(pathFile + "/public/interfaceClient/interfaceClient.js");
})
app.get('/blablamove/interfaceClient.css', function (req, res) {
    res.sendFile(pathFile + "/public/interfaceClient/interfaceClient.css");
})
app.get('/blablamove/interfaceInsurer.js', function (req, res) {
    res.sendFile(pathFile + "/public/interfaceInsurer/interfaceInsurer.js");
})
app.get('/blablamove/interfaceInsurer.css', function (req, res) {
    res.sendFile(pathFile + "/public/interfaceInsurer/interfaceInsurer.css");
})
app.get('/blablamove/interfaceDriver.js', function (req, res) {
  res.sendFile(pathFile + "/public/interfaceDriver/interfaceDriver.js");
})
app.get('/blablamove/interfaceDriver.css', function (req, res) {
  res.sendFile(pathFile + "/public/interfaceDriver/interfaceDriver.css");
})


//interfaces
app.get('/blablamove/client', function (req, res) {
  res.contentType("text/html");
  res.sendFile(pathFile + "/public/interfaceClient/interfaceClient.html");
})

app.get('/blablamove/insurer', function (req, res) {
  res.contentType("text/html");
  res.sendFile(pathFile + "/public/interfaceInsurer/interfaceInsurer.html");
})

app.get('/blablamove/driver', function (req, res) {
  res.contentType("text/html");
  res.sendFile(pathFile + "/public/interfaceDriver/interfaceDriver.html");
})

app.get('/blablamove/clientFinish', function (req, res) {
  res.contentType("text/html");
  res.sendFile(pathFile + "/public/interfaceClient/finishContrat.html");
})

//run server
app.listen(3000, function () {
  console.log('server listening on port 3000!')
})