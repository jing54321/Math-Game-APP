
import sqlite3 from 'sqlite3';

const sqlite = sqlite3.verbose()

const db = new sqlite.Database(':memory:', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });
  
const dropQuery = `DROP TABLE IF EXISTS users`;

const insertQuery = `
  CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(50),
    password VARCHAR(50)
  )
`;
const dummyDataQuery = `
insert into users ('username','password') values ('admin', '123'), ('test', 'abc'),('mason', '123')`;

db.serialize(() => {
    db.each(dropQuery);
    db.each(insertQuery);
    db.each(dummyDataQuery);
});
/** 
db.close((err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Close the database connection.');
    }
});
*/
export default db;
