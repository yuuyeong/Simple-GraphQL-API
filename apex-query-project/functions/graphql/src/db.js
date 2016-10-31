import Promise from 'bluebird';
import mysql from 'mysql';

let host = '';
let user = '';
let password = '';
let dbname = '';


export function getProject(args) {
  return new Promise((resolve, reject) => {
    console.log("getProject start");
    const connection = mysql.createConnection({
      host     : host,
      user     : user,
      password : password,
      database : dbname
    });

    console.log("created connection");

    connection.connect(function(err){
      if(err){
        console.log('db error', err);
        throw err;
      }
    });

    console.log("connected connection");

    console.log("args.id : ", args.id);
    console.log("querying");
    connection.query('SELECT * FROM projects WHERE id = ?', [args.id], function(err, rows, fields) {
      console.log('connection end');
      connection.end();
      if(err){
        console.log(err);
        connection.end();
        return reject(err);
      } else {
        console.log("rows : ", rows[0]);
        return resolve(rows[0]);
      }
    });
  })
}

