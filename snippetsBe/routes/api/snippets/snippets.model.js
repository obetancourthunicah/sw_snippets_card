
const { mysqlConn, query} = require('../../utils/db');
// allHandler(err, returnValue)

// Funcional
// ---------------------------------------------------------------------------
module.exports.getAll = (handler)=>{
  mysqlConn.query(
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

module.exports.getById = (id, handler)=>{
  const sqlstr = "SELECT * from snippets where id=?;";
  mysqlConn.query(
    sqlstr,
    [id],
    (err, result)=>{
      if(err){
        console.log(err);
        handler(err, null);
      } else {
        handler(null, result);
      }
    }
  );
}

module.exports.addNew = (snippetName, snippet, stated, handler ) =>{
  const sqlstr = "INSERT INTO snippets (name, snippet, stated) values (?,?,?);";
  mysqlConn.query(
    sqlstr,
    [snippetName, snippet, stated],
    (err, result)=>{
      if(err){
        console.log(err);
        handler(err, null);
      }else {
        handler(null, result);
      }
    }
  );
}

module.exports.update = ( snippetName, snippet, stated, id ,handler) => {
  const sqlstr = "UPDATE snippets set name = ?, snippet = ?, stated = ? where id = ?;";
  mysqlConn.query(
    sqlstr,
    [snippetName, snippet, stated, id],
    (err, result) => {
      if (err) {
        console.log(err);
        handler(err, null);
      } else {
        handler(null, result);
      }
    }
  );
}

module.exports.deleteRow =  (id, handler) => {
  const sqlstr = "DELETE FROM  snippets where id = ?;";
  mysqlConn.query(
    sqlstr,
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
        handler(err, null);
      } else {
        handler(null, result);
      }
    }
  );
}



//Asyncronica
//--------------------------------------------------------------------------
module.exports.getAllAsync = async ()=>{
  try{
     return await query("Select * from snippets");
   }catch(e){
     throw(e);
   }
}

module.exports.getByIdAsync = async (id) => {
  const sqlstr = "SELECT * from snippets where id=?;";
  try{
    return query(sqlstr, [id]);
  }catch(ex){
    throw(ex);
  }
}

module.exports.addNewAsync = async ({snippetName, snippet, stated}) => {
  const sqlstr = "INSERT INTO snippets (name, snippet, stated) values (?,?,?);";
  try{
    return await query(sqlstr, [snippetName, snippet, stated]);
  }catch(ex){
    throw(ex);
  }
}

module.exports.updateAsync = async ({ snippetName, snippet, stated , id}) => {
  const sqlstr = "UPDATE snippets set name = ?, snippet = ?, stated = ? where id = ?;";
  try {
    return await query(sqlstr, [snippetName, snippet, stated, id]);
  } catch (ex) {
    throw (ex);
  }
}

module.exports.deleteAsync = async (id) => {
  const sqlstr = "DELETE FROM  snippets where id = ?;";
  try {
    return await query(sqlstr, [id]);
  } catch (ex) {
    throw (ex);
  }
}

//
