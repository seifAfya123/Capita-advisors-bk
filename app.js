require('dotenv').config();
const express = require('express');
const port = process.env.PORT || 8000;
const connection = require('./src/config/db');
const cors = require('cors');
const routes = require('./src/routes')

connection();
const app = express()

app.use(express.json());
app.use(cors())
app.use(routes)

// setup for upload images
app.use('/public', express.static('public'));

app.listen(port, function () {
    console.log(`Express server listening on port ${port}`)
  })
