const express = require("express");
const sanitizeHtml = require("sanitize-html");
const { comentarios } = require("./xss_armazenado");

const app = express();

app.get("/xss_22", (req, res) => {
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
    const sanitizedComment = sanitizeHtml(comment);
    html += `<li>${sanitizedComment}</li>`;
  }
  html += "</ul>";

  res.send(html);
});

app.post("/xss_22form", (req, res) => {
  const comentario = req.body.comentario;
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  comentarios.push(`IP:${ip} Comentario: ${comentario}`);

  res.redirect("xss_22");
});

module.exports = app;
