const express = require("express");
const sanitizeHtml = require("sanitize-html");
const { db } = require("./start_sqllite");

const app = express();

const comentarios = ["Ihaaaa", "Teste", "Final"];

const adicionarFormulario = (html) => {
  html += "<h1>Formulário</h1>";
  html += "<form action='sql_inj_2form' method='post'>";
  html += "<input name='comentario' type='text' />";
  html += "<br/>";
  html += "<input type='submit' />";
  html += "</form>\n";
  return html;
};

const adicionarListagemComentarios = (html) => {
  html += "<h2>Listagem</h2>";
  html += "<ul>";
  for (const comment of comentarios) {
    html += `<li>${comment}</li>`;
  }
  html += "</ul>";
  return html;
};

const criarConsulta = () => {
  let query =
    "SELECT coluna01, coluna02 FROM tb01 WHERE (coluna01 like '%1' or coluna01 like '%2')";

  return query;
};

app.get("/sql_inj_2", (req, res) => {

  let html = "";
  html = adicionarFormulario(html);
  html = adicionarListagemComentarios(html);

  const query = criarConsulta();

  html += "<h2>Consulta</h2>";
  html += `<p>${query}</p>`;

  try {
    const linhas = db.prepare(query).all();

    html += "<h2>Listagem</h2>";
    html += "<table>";
    for (const row of linhas) {
      html += `<tr><td>${row.coluna01}</td><td>${row.coluna02}</td></tr>`;
    }
    html += "</table>";
  } catch (ex) {
    html += "<h2>Erro</h2>";
    html += `<p>${JSON.stringify(ex)}</p>`;
  }

  res.send(html);
});

app.post("/sql_inj_2form", (req, res) => {
  const comentario = req.body.comentario;
  const sanitizedComment = sanitizeHtml(comentario);
  comentarios.push(sanitizedComment);

  res.redirect("sql_inj_2");
});

module.exports = app;
