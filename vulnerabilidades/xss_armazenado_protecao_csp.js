const express = require("express");
const { comentarios } = require("./xss_armazenado");

const app = express();

app.get("/xss_222", (req, res) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; img-src 'self' example.com"
  );

  let html = "";

  html += "<h1>Formulário</h1>";
  html += "<form action='xss_22form' method='post'>";
  html += "<input name='comentario' type='text' />";
  html += "<br/>";
  html += "<input type='submit' />";
  html += "</form>\n";

  html += "<h2>Listagem</h2>";
  html += "<ul>";
  for (const comment of comentarios) {
    html += `<li>${comment}</li>`;
  }
  html += "</ul>";

  res.send(html);
});

app.post("/xss_222form", (req, res) => {
  const comentario = req.body.comentario;
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  comentarios.push(`IP:${ip} Comentário: ${comentario}`);

  res.redirect("xss_222");
});

module.exports = app;
