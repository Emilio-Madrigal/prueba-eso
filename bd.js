const mysql = require('mysql');
const db=mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:'',
    database:'login_bd'
});

db.connect((err)=>{
    if(err)throw err;
    console.log('conectado a la base de datos');
});

module.exports=db;