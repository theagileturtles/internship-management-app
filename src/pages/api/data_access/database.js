import mysql from 'mysql';
import util from 'util';

export function createConnection(){
   const connection =  mysql.createConnection({
        host: process.env.DATABASE_URL,
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD
      });

      connection.connect(function(err){
        if (err) throw err;
        console.log("Connected to database!")
      })
      
      return connection;
}

export function query(connection){
  return util.promisify(connection.query).bind(connection);
}

