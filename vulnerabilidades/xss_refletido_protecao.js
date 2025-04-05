const express = require('express');
const sanitizeHtml = require('sanitize-html');

const app = express();

app.get('/xss_11', function(req, res) {
    const searchTerm = req.query.q;
    const sanitizedSearchTerm = sanitizeHtml(searchTerm);
    res.send('You searched for: ' + sanitizedSearchTerm);
});

module.exports = app;