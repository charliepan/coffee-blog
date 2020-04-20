require('dotenv').config();

const express = require('express'),
      app = express(),
      massive = require('massive'),
      {SERVER_PORT} = process.env;

app.use(express.json());

app.listen(SERVER_PORT, () => console.log(`Listening from ${SERVER_PORT} server be`));