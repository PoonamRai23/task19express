const mysql=require('mysql2');

const pool =mysql.createPool({
    host:'localhost',
    user:'root',
    database:'expense_app',
    password:'Mohit@12345'
})

module.exports=pool.promise();
