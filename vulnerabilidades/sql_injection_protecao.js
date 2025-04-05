const express = require("express");
const sanitizeHtml = require("sanitize-html");
const { db } = require("./start_sqllite");

const app = express();

const criarConsulta = (coluna01, coluna02) => {
  let query =
    "SELECT coluna01, coluna02 FROM tb01 WHERE (coluna01 like '%1' or coluna01 like '%2')";
  if (coluna01) {
    query += ` AND coluna01 like '%@coluna01%'`;
  }
  if (coluna02) {
    query += ` AND coluna02 like '%@coluna02%'`;
  }
  return query;
};

app.get("/sql_inj_11", (req, res) => {
  const coluna01 = sanitizeHtml(req.query.coluna01);
  const coluna02 = sanitizeHtml(req.query.coluna02);

  let html = "";
  html += "<h1>Filtros</h1>";
  html += "<form action='sql_inj_11' method='get'>";
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
    const stmt = db.prepare(query);
    const filtros = {};
    if (coluna01) {
      filtros.coluna01 = coluna01;
    }
    if (coluna02) {
      filtros.coluna02 = coluna02;
    }
    const linhas = stmt.all(filtros);

    html += "<h2>Listagem</h2>";
    html += "<table>";
    for (const linha of linhas) {
      html += `<tr><td>${linha.coluna01}</td><td>${linha.coluna02}</td></tr>`;
    }
    html += "</table>";
  } catch (ex) {
    html += "<h2>Erro</h2>";
    html += `<p>${JSON.stringify(ex)}</p>`;
  }

  res.send(html);
});

module.exports = app;

/* Exemplos de ataque:
' or 1=1 and '' != '
' AND coluna01 like '%' union SELECT * FROM tb02 where 1=1 and '' != '
' AND coluna01 like '%' union SELECT type, sql FROM sqlite_master where 1=1 and '' != '
*/
