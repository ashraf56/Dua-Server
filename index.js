const express = require('express');
const sqlite3 = require('sqlite3');
const port = 3000
const app = express();
let cors = require('cors')

app.use(cors())
app.use(express.json())
// Open SQLite database
const db = new sqlite3.Database('./dua_main.sqlite');

// Endpoint to get all categories
app.get('/categories', (req, res) => {
  db.all('SELECT * FROM category', (err, rows) => {
    if (err) {
      res.status(500).send({error: err});
    }
    res.status(200).json(rows);
  });
});

// Endpoint to get all subcategories for a category
app.get('/categories/:categoryId/subcategories', (req, res) => {
  db.all(`SELECT * FROM sub_category WHERE cat_id = ${req.params.categoryId}`, (err, rows)  => {
     if (err) {
       res.status(500).send({error: err});  
     }
     res.status(200).json(rows); 
  }); 
});


// Endpoint for all dua's
app.get('/subcategories/:subcategoryId/duas', (req, res) => {
  db.all(`SELECT * FROM dua WHERE subcat_id = ${req.params.subcategoryId}`, (err, rows) => {
     if (err) {
       res.status(500).send({error: err});
     }
     res.status(200).json(rows);
  });
});

app.get('/',  (req , res)  => {
res.send('Dua started..')
})

// Start express server
app.listen(port, () => {
  console.log('Server started on port 3000');
});