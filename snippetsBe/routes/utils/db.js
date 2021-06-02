var mysql = require("mysql");

var mysqlConn = mysql.createConnection({
	host : "127.0.0.1",
	user : "root",
	password: "root",
	database: "sw202102"
});

mysqlConn.connect((err)=>{
	if(err){
		console.log(err);
		process.exit(1);
	}
} );

module.exports = mysqlConn;
