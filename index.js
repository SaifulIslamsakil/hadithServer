const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express()
const PORT = process.env.PORT || 5000


// create a database connection 
app.use(express.json())


const db = new sqlite3.Database("hadith_db.db", (err)=>{
    if(err){
        console.error('Database connection error:', err.message)
    }
    else{
        console.log('Connected to the SQLite database.')
    }
})


app.get("/", async (req, res)=>{
    res.send("my sqlite database in runing")
})
app.get("/chapter", async (req, res)=>{
    db.all('SELECT * FROM chapter', (err, row)=>{
        if(err){
            console.error('Error querying database:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }else{
            console.log(row)
            res.send(row)
            
        }
    })
})
app.get("/books", async (req, res)=>{
    db.all('SELECT * FROM books', (err, row)=>{
        if(err){
            console.error('Error querying database:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }else{
            console.log(row)
            res.send(row)
            
        }
    })

})
app.get("/hadith", async (req, res)=>{
    db.all('SELECT * FROM hadith', (err, row)=>{
        if(err){
            console.error('Error querying database:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }else{
            console.log(row)
            res.send(row)
            
        }
    })
})
app.get("/section", async (req, res)=>{
    db.all('SELECT * FROM section', (err, row)=>{
        if(err){
            console.error('Error querying database:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }else{
            console.log(row)
            res.send(row)
            
        }
    })
})

app.get("/book/:id", async (req, res)=>{
    const id = req?.params?.id;
    const sql = `SELECT * FROM books WHERE id = ?`;
    db.get(sql, [id], (err, row) => {
        if (err) {
          return console.error(err.message);
        }
        else{

            res.send(row); 
        }
      });
})
app.get("/chapterData/:id", async (req, res)=>{
    const id = req?.params?.id;
    const sql = `SELECT * FROM chapter WHERE book_id = ?`;
    db.all(sql, [id], (err, row) => {
        if (err) {
          return console.error(err.message);
        }
        else{

            res.send(row); 
        }
      });
})
app.get("/hadiths/:id", async (req, res)=>{
    const id = req?.params?.id;
    console.log(id)
    const sql = `SELECT * FROM hadith WHERE chapter_id = ?`;
    db.all(sql, [id], (err, row) => {
        if (err) {
          return console.error(err.message);
        }
        else{

            res.send(row); 
        }
      });
})
app.listen(PORT, ()=>{
    console.log(`server runing on port${PORT}`)
})