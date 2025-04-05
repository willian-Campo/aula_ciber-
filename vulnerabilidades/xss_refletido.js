const express = require("express");
const app = express();

app.get("/xss_1", function (req, res) {
  var searchTerm = req.query.q;
  res.send("You searched for: " + searchTerm);
});

module.exports = app;