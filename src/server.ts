import express from 'express';
import path from 'path';
import { Client } from 'pg';

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'my-db-name',
  password: 'newPassword',
  port: 5432,
});

client.connect();

client.query('SELECT NOW()').then(res => {
  console.log(res.rows);
  client.end();
}).catch(err => {
  console.log('error', err);
});

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static('./dist'));

app.use('*',  (req, res)=> {
  res.sendFile(path.join(__dirname, './dist', 'index.html'));
});

app.listen(PORT, function() {
  console.log(`Example app listening on port ${PORT}!`);
});
