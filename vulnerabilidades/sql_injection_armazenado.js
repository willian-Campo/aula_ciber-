const express = require("express");
const sanitizeHtml = require("sanitize-html");
const { db } = require("./start_sqllite");

const app = express();

const coletarRegistros = () => {
  const query = "SELECT registro FROM bi";
  const linhas = db.prepare(query).all();

  return linhas.map((linha) => linha.registro);
};

const adicionarRegistro = (registro) => {
  const stmt1 = db.prepare("INSERT INTO bi (registro) VALUES (?)");
  stmt1.run(registro);
};

const processarRegistros = () => {
  const queryReg = "SELECT registro FROM bi";
  const linhaReg = db.prepare(queryReg).all();

  let palavras = [];
  for (const linha of linhaReg) {
    palavras = palavras.concat(linha.registro.split(" "));
  }

  const query = `SELECT coluna01 FROM tb01 where lower(coluna01) in(${palavras.map(
    (palavra) => `'${palavra.toLowerCase()}'`
  )})`;
  const linhas = db.prepare(query).all();

  return linhas.map((linha) => linha.coluna01);
};

const adicionarFormulario = (html) => {
  html += "<h1>Formulário</h1>";
  html += "<form action='sql_inj_2form' method='post'>";
  html += "<input name='comentario' type='text' />";
  html += "<br/>";
  html += "<input type='submit' />";
  html += "</form>\n";
  return html;
};

const adicionarListagemRegistro = (html) => {
  html += "<h2>Listagem</h2>";
  html += "<ul>";
  for (const registro of coletarRegistros()) {
    html += `<li>${registro}</li>`;
  }
  html += "</ul>";
  return html;
};

const adicionarListagemProcessamento = (html) => {
  html += "<h2>Listagem processada</h2>";
  html += "<ul>";
  for (const registro of processarRegistros()) {
    html += `<li>${registro}</li>`;
  }
  html += "</ul>";
  return html;
};

app.get("/sql_inj_2", (req, res) => {
  let html = "";
  html = adicionarFormulario(html);
  html = adicionarListagemRegistro(html);
  html = adicionarListagemProcessamento(html);

  res.send(html);
});

app.post("/sql_inj_2form", (req, res) => {
  const comentario = req.body.comentario;
  const sanitizedComment = sanitizeHtml(comentario);
  adicionarRegistro(sanitizedComment);

  res.redirect("sql_inj_2");
});

module.exports = app;
