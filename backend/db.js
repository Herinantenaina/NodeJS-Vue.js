const mysql = require("mysql2")

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "mydb"
})

con.connect(function(err) {
    if (err) throw err
    console.log("Database connect!")
});

module.exports = con;