import Promise from 'bluebird';
import mysql from 'mysql';

let host = 'localhost';
let user = 'root';
let dbname = 'tumblbug_development';

const connection = mysql.createConnection({
  host     : host,
  user     : user,
  database : dbname
});

connection.connect(function(err){
  if(err){
    console.log('db error', err);
    throw err;
  }
});

export function getProject(args) {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM projects WHERE id = ?', [args.id], (err, rows, fields) => {
      // connection.end();
      if(err){
        console.log(err);
        return reject(err);
      } else {
        return resolve(rows[0]);
      }
    })
  })
}

