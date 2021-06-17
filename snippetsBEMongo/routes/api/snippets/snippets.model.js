const MongoDB = require('../../utilities/db');
const ObjectId = require('mongodb').ObjectID;
let db;
let snippetCollection;

//se ejecuta cuando se manda a require(este archivo)
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

module.exports.getById = async (id)=>{
  try {
    const _id = new ObjectId(id);
    const filter =  {_id: _id};
    let row = await snippetCollection.findOne(filter);
    return row;
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

module.exports.addAny = async (document) => {
  try {
    let result = await snippetCollection.insertOne(document);
    return result.ops;
  } catch (ex) {
    console.log(ex);
    throw (ex);
  }
}

//   _id: ObjectID("afasdasdccasb102938")
