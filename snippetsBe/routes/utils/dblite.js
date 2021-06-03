var sqlite3 = require("sqlite3");
let sqliteConn = new sqlite3.Database("myFileDB.db", sqlite3.OPEN_CREATE,(err)=>{
	if(err){
		console.log(err);
		process.exit(1);
	}
});

module.exports = sqliteConn;
