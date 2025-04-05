const express = require("express");
const app = express();

const comentarios = ["Ihaaaa", "Teste", "Final"];
app.get("/xss_2", (req, res) => {
  let html = "";

  html += "<h1>Formulário</h1>";
  html += "<form action='xss_2form' method='post'>";
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

app.post("/xss_2form", (req, res) => {
  const comentario = req.body.comentario;
  comentarios.push(comentario);

  res.redirect("xss_2");
});

app.comentarios = comentarios;
module.exports = app;
