const MongoDB = require('../../utilities/db');
const {ObjectId} = require('bson');
let db;
let snippetCollection;

(async function(){
    try{
      if (!snippetCollection) {
        db = await MongoDB.getDB();
        snippetCollection = db.collection("snippets");
        if(process.env.ENSURE_INDEX == 1){
          // Vamos a asegurarnos de que exista el indice
        }
      }
    }catch(ex){
      console.log(ex);
      process.exit(1);
    }
})();

module.exports.getAll = async ()=>{
  try {
    let docsCursor = snippetCollection.find({});
    let rows = await docsCursor.toArray()
    return rows;
  } catch(ex){
    console.log(ex);
    throw(ex);
  }
}

module.exports.addOne = async (name, snippet, user)=>{
  try{
    let newSnippet = {
      name:name,
      snippet:snippet,
      user:user
    };
    let result = await snippetCollection.insertOne(newSnippet);
    return result.ops;
  }catch(ex){
    console.log(ex);
    throw(ex);
  }

}
