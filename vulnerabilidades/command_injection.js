const express = require("express");
const { exec } = require("child_process");
const app = express();

// Listen in on root
app.get("/com_inj_1", (req, res) => {
  const pasta = req.query.pasta;
  console.log(pasta);
  if (pasta) {
    // Run the command with the parameter the user gives us
    exec(`ls -l ${pasta}`, (error, stdout, stderr) => {
      let output = stdout;
      if (error) {
        // If there are any errors, show that
        output = error;
      } else if (stderr) {
        // If there are any errors, show that
        output = error;
      }
      res.send(`<pre>${output}</pre>`);
    });
  } else {
    res.send("informe o parametro pasta");
  }
});

module.exports = app;
