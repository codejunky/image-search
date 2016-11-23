const express = require('express');
const mongoose = require('mongoose');
const request = require('request');
const moment = require('moment');
const path = require('path');

const History = require('./models/History');

var app = express();

mongoose.connect('mongodb://fcc:Password1!@ds035826.mlab.com:35826/image-search');

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'))
});

app.get('/api/imagesearch/:query', (req, res) => {
  const query = req.params.query;
  const page = req.query.offset;
  const time = moment(new Date).unix();
  const url = `https://api.imgur.com/3/gallery/search/time/${page}?q_all=${query}`;

  // Track the user searches
  const entry = new History({term: query, when: time});
  entry.save((err, hist) => {
    console.log(hist)
    console.log('User search saved to db');
  });

  // Query imgur API for the term supplied by the user
  const requestOptions = {
    url: url,
    headers: {
      'Authorization': 'Client-ID 1ebf988fc8c852b'
    }
  }

  request(requestOptions, (err, response, body) => {
    res.json({
      data: JSON.parse(body).data
    })
  });
});


app.get('/api/latest/imagesearch', (req, res) => {
  History.find({})
         .sort({when: -1})
         .limit(10)
         .exec((err, entries) => {
           res.json({
             history: entries
           })
         });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`App running on port: ${process.env.PORT || 3000}`);
});
