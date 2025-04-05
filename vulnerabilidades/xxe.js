const express = require("express");
const { XMLParser, XMLBuilder, XMLValidator } = require("fast-xml-parser");
const app = express();

const xml = `<?xml version="1.0" encoding="ISO-8859-1"?>
<!DOCTYPE foo [
  <!ELEMENT foo ANY >
  <!ENTITY xxe SYSTEM "file:///etc/shadow" >]>
<foo>&xxe;</foo>`;


app.get("/xxe", function (req, res) {
  const parser = new XMLParser();
  let jObj = parser.parse(xml);

  const builder = new XMLBuilder();
  const xmlContent = builder.build(jObj);

  res.send(xmlContent);
});

module.exports = app;
