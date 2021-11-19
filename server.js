const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

app.use(express.static('./dist'));

app.listen(PORT, HOST, function () {
  console.log(`Example app listening on port ${PORT}!`);
}); 