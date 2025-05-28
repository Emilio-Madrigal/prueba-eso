const express = require('express');
const bodyParser = require('body-parser');
const db = require('./bd');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/index', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';

    db.query(sql, [username, password], (err, resultados) => {
        if (err) throw err;

        if (resultados.length > 0) {
            res.send('Inicio de sesión exitoso');
        } else {
            res.send('Credenciales incorrectas');
        }
    });
});

app.post('/crear', (req, res) => {
    const { username, password } = req.body;

    const checkUserSql = 'SELECT * FROM users WHERE username = ?';
    db.query(checkUserSql, [username], (err, resultados) => {
        if (err) throw err;

        if (resultados.length > 0) {
            res.send('El nombre de usuario ya está en uso. Intenta con otro.');
        } else {
            const insertUserSql = 'INSERT INTO users (username, password) VALUES (?, ?)';
            db.query(insertUserSql, [username, password], (err, result) => {
                if (err) throw err;

                res.send('Usuario registrado correctamente');
            });
        }
    });
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000/');
});
