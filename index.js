const express = require('express');
const mongoose = require('mongoose');


var app = express();

app.get('/api/imagesearch/:query', (req, res) => {
  res.json({
    message: 'Hello world!'
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`App running on port: ${process.env.PORT || 3000}`);
});
