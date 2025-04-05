const express = require('express');
const bodyParser = require('body-parser')

const xss_refletido = require('./xss_refletido');
const xss_refletido_protecao = require('./xss_refletido_protecao');
const xss_armazenado = require('./xss_armazenado');
const xss_armazenado_protecao = require('./xss_armazenado_protecao');
const sql_injection = require('./sql_injection');
const sql_injection_protecao = require('./sql_injection_protecao');
const sql_injection_armazenado = require('./sql_injection_armazenado');

const app = express();
app.use(bodyParser.urlencoded())

// XSS
app.use(xss_refletido);
app.use(xss_refletido_protecao);
app.use(xss_armazenado);
app.use(xss_armazenado_protecao);

// SQL injection
app.use(sql_injection);
app.use(sql_injection_protecao);
app.use(sql_injection_armazenado);

app.listen(8080);