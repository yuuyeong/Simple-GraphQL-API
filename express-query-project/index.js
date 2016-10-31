import express from 'express';
import schema from './schema';
import { graphql } from 'graphql';
import bodyParser from 'body-parser';


let app = express();
let PORT = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/graphql', (req, res) => {
  res.send('get!');
;})

app.post('/graphql', (req, res) => {
  console.log(req.body.query);
  graphql(schema, req.body.query)
    .then((result) => {
      console.log('result:', result);
      var json = JSON.stringify(result, null, 2)
      console.log(json);
      res.send(json);
    });
;})

let server = app.listen(PORT, function(){
  console.log('listening');
})