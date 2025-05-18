const express = require("express");
const app = express();

app.get("/session_1", function (req, res) {
  const antigoCookie = req.cookies;
  const novoCookie = Math.random().toString(36).substring(7);
  
  //const cookie = `aula=${novoCookie}; Secure; HttpOnly;`;
  const cookie = `aula=${novoCookie}; Secure; HttpOnly; SameSite=Strict`;
  
  res.setHeader("Set-Cookie", cookie);
  res.setHeader("Access-Control-Allow-Origin", "google.com");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  let retorno = "";
  retorno += `Cookies antigos: <pre>${JSON.stringify(antigoCookie, null, 2)}</pre>`;
  retorno += "<br/>";
  retorno += "Cookie alterado para: " + novoCookie;

  res.send(retorno);
});

module.exports = app;
