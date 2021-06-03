
const mySqlConn = require('../../utils/db');
// allHandler(err, returnValue)
module.exports.getAll = (handler)=>{
  mySqlConn.query(
    "SELECT * from snippets;",
    (err, rows)=>{
      if(err){
        console.log(err);
        handler(err, null);
      }else{
        handler(null, rows);
      }
    }
  );
};


//TODO
module.exports.getAllAsync = async ()=>{
  // try{
  //   return await mySqlConn.query("Select * from snippets");
  // }catch(e){
  //   throw(e);
  // }
}
