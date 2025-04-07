const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');

const xss_refletido = require("./xss_refletido");
const xss_refletido_protecao = require("./xss_refletido_protecao");
const xss_armazenado = require("./xss_armazenado");
const xss_armazenado_protecao = require("./xss_armazenado_protecao");
const xss_armazenado_protecao_csp = require("./xss_armazenado_protecao_csp");
const sql_injection = require("./sql_injection");
const sql_injection_protecao = require("./sql_injection_protecao");
const sql_injection_armazenado = require("./sql_injection_armazenado");
const xxe = require("./xxe");
const command_injection = require("./command_injection");
const path_traversal_armazenado = require("./path_traversal_armazenado");

const app = express();
app.use(bodyParser.urlencoded());
app.use(fileUpload());

// XSS
app.use(xss_refletido);
app.use(xss_refletido_protecao);
app.use(xss_armazenado);
app.use(xss_armazenado_protecao);
app.use(xss_armazenado_protecao_csp);

// SQL injection
app.use(sql_injection);
app.use(sql_injection_protecao);
app.use(sql_injection_armazenado);

// Command Injection
app.use(command_injection);

// XXE
app.use(xxe);

// Path Traversal
app.use(path_traversal_armazenado);


const PORT = 8080;
app.listen(PORT);

console.log(`http://localhost:${PORT}`);
