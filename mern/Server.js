const express = require('express');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT;


app.get('/', function (req, res) {
  res.send('Hello World')
});
 
app.listen(PORT, console.log('listing on',PORT))