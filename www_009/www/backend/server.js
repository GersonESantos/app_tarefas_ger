const express = require('express');
const mysql = require('mysql');

// opcoes de conexao com o MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bd_tasks'
});

const app = new express();
app.listen(3000, () => {
    console.log('Servidor iniciado.');
})

// rotas
// ----------------------------------------
app.get("/", (req, res) => {

    // res.send('Olá Mundo!');
    connection.query("SELECT COUNT(*) users FROM users", (err, results) => {
        if(err){
            res.send('MySQL connection error.');
        }
        res.send('MySQL connection OK.');
    })
});

// ----------------------------------------
app.get("/user/:id", (req, res) => {
    connection.query("SELECT id, username, created_at FROM users WHERE id = ?", [req.params.id] ,(err, results) => {
        if(err){
            res.send('MySQL connection error.');
        }
        res.json(results);
    })
});

