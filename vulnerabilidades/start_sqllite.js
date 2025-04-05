const db = require("better-sqlite3")();

const registroTable01 = [
  { coluna01: "A1", coluna02: "B1" },
  { coluna01: "A1", coluna02: "B2" },
  { coluna01: "A1", coluna02: "B3" },
  { coluna01: "A1", coluna02: "B4" },
  { coluna01: "A2", coluna02: "B1" },
  { coluna01: "A2", coluna02: "B2" },
  { coluna01: "A2", coluna02: "B3" },
  { coluna01: "A3", coluna02: "B1" },
  { coluna01: "A3", coluna02: "B2" },
  { coluna01: "A3", coluna02: "B3" },
  { coluna01: "A3", coluna02: "B4" },
  { coluna01: "A4", coluna02: "B1" },
  { coluna01: "A4", coluna02: "B2" },
  { coluna01: "A4", coluna02: "B3" },
  { coluna01: "A4", coluna02: "B4" },
  { coluna01: "A4", coluna02: "B5" },
];

const registroTable02 = [
  { coluna01: "c1", coluna02: "d1" },
  { coluna01: "c2", coluna02: "d2" },
  { coluna01: "c3", coluna02: "d3" },
  { coluna01: "c4", coluna02: "d4" },
];

// Cria as tabelas
db.prepare("CREATE TABLE tb01 (coluna01 TEXT, coluna02 TEXT)").run();
db.prepare("CREATE TABLE tb02 (coluna01 TEXT, coluna02 TEXT)").run();

// Insere na tabela 01
const stmt1 = db.prepare("INSERT INTO tb01 VALUES (?, ?)");
registroTable01.forEach((registro) =>
  stmt1.run(registro.coluna01, registro.coluna02)
);

// Insere na tabela 02
const stmt2 = db.prepare("INSERT INTO tb02 VALUES (?, ?)");
registroTable02.forEach((registro) =>
  stmt2.run(registro.coluna01, registro.coluna02)
);

const tb01 = db
  .prepare("SELECT rowid AS id, coluna01, coluna02 FROM tb01")
  .all();
console.log("Conteudo tabela tb01:", tb01);

const tb02 = db
  .prepare("SELECT rowid AS id, coluna01, coluna02 FROM tb02")
  .all();
console.log("Conteudo tabela tb02:", tb02);

const tables = db.prepare("SELECT * FROM sqlite_master").all();
console.log("Tabelas:", tables);

module.exports = {
  db,
};
