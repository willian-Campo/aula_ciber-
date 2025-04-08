const express = require("express");
const sanitizeHtml = require("sanitize-html");
const { db } = require("./start_sqllite");

const app = express();

const tentativasSucesso = [];
const tentativas = [];
const criarConsulta = (coluna01, coluna02) => {
  let query =
    "SELECT coluna01, coluna02 FROM tb01 WHERE (coluna01 like '%1' or coluna01 like '%2')";
  if (coluna01) {
    tentativas.push(coluna01);
    query += ` AND coluna01 like '%${coluna01}%'`;
  }
  if (coluna02) {
    tentativas.push(coluna02);
    query += ` AND coluna02 like '%${coluna02}%'`;
  }
  return query;
};

app.get("/sql_inj_1", (req, res) => {
  const coluna01 = sanitizeHtml(req.query.coluna01);
  const coluna02 = sanitizeHtml(req.query.coluna02);

  let html = "";
  html += "<h1>Filtros</h1>";
  html += "<form action='sql_inj_1' method='get'>";
  html += `<input name='coluna01' type='text' placeholder='Filtro coluna01' value="${coluna01}" style="width: 50%"/>`;
  html += "<br/>";
  html += `<input name='coluna02' type='text' placeholder='Filtro coluna02' value="${coluna02}" style="width: 50%"/>`;
  html += "<br/>";
  html += "<input type='submit' />";
  html += "</form>\n";

  const query = criarConsulta(coluna01, coluna02);

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

    if (coluna01 && coluna01.includes("'")) {
      tentativasSucesso.push(coluna01);
    }
    if (coluna02 && coluna02.includes("'")) {
      tentativasSucesso.push(coluna02);
    }
  } catch (ex) {
    html += "<h2>Erro</h2>";
    html += `<p>${JSON.stringify(ex)}</p>`;
  }

  html += "<h2 id='titulo'>Tentativas sucesso</h2>";
  html += "<ul>";
  for (const tentativa of tentativasSucesso) {
    html += `<li>${tentativa}</li>`;
  }
  html += "</ul>";

  html += "<h2 id='titulo'>Tentativas</h2>";
  html += "<ul>";
  for (const tentativa of tentativas) {
    html += `<li>${tentativa}</li>`;
  }
  html += "</ul>";

  res.send(html);
});

module.exports = app;
