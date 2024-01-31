const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./dua_main.sqlite');

db.all('SELECT * FROM category', (err, rows) => {
    if (err) {
      throw err;
    }
  
    rows.forEach(row => {
      console.log(row); 
    });
  });

  const insert = 'INSERT INTO some_table (name, age) VALUES (?, ?)';

db.run(insert, ['John', 32], function(err) {
  if (err) {
    return console.error(err.message);
  }
  console.log(`Row inserted`);
});

db.close();