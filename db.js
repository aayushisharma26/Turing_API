const mysql=require('mysql')
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123@Navgurukul",
})

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE Turing", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});