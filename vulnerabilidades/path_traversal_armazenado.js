const express = require("express");
const fs = require("fs");
const app = express();

const arquivos = [{ id: 1, nomearquivo: "arquivo.txt", caminho: "" }];
app.get("/path_traversal_1", (req, res) => {
  let html = "";

  html += "<h1>Formulário</h1>";
  html +=
    "<form action='path_traversal_upload' method='post' encType='multipart/form-data'>";
  html += "<input name='arquivo' type='file' />";
  html += "<br/>";
  html += "<input type='submit' />";
  html += "</form>\n";

  html += "<h2>Listagem</h2>";
  html += "<ul>";
  for (const arquivo of arquivos) {
    html += `<li>ID: ${arquivo.id} <a href="path_traversal_download/${arquivo.id}">${arquivo.nomearquivo}</li>`;
  }
  html += "</ul>";

  res.send(html);
});

function gerarCaminho(subpasta, nomearquivo) {
  //Pasta base dos uploads
  const pastaBase = `${__dirname}/upload`;
  //Pasta do especifica
  const pasta = `${pastaBase}/${subpasta}`;

  const prefixo = (Math.random() + 1).toString(36).substring(7);
  const caminho = `${pasta}/${prefixo}_${nomearquivo}`;

  return { pasta, caminho };
}

app.post("/path_traversal_upload", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("Nenhum arquivo encaminhado.");
  }

  const ip = (
    req.headers["x-forwarded-for"] || req.socket.remoteAddress
  ).replace(/:/g, "_");
  const arquivo = req.files.arquivo;
  const nomearquivo = arquivo.name;

  console.log(nomearquivo)
  const { pasta, caminho } = gerarCaminho(ip, nomearquivo);

  fs.mkdirSync(pasta, { recursive: true });

  arquivo.mv(caminho, function (err) {
    if (err) return res.status(500).send(err);

    arquivos.push({
      id: arquivos.length + 1,
      nomearquivo,
      caminho,
    });
    res.redirect("path_traversal_1");
  });
});

module.exports = app;
