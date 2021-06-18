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

module.exports.getBySales = async (sales)=>{
  try{
    const filter = {sales:sales};
    let cursor = snippetCollection.find(filter);
    let rows = await cursor.toArray();
    return rows;
  }catch(ex){
    console.log(ex);
    throw (ex);
  }
}

module.exports.getBySalesWithOperator = async (sales, operator) => {
  try {
    let mongoOperator = {};
    switch(operator){
      case "gt":
        mongoOperator["$gt"] = sales;
       break;
      case "lt":
        mongoOperator["$lt"] = sales;
        break;
      case "gte":
        mongoOperator["$gte"] = sales;
        break;
      case "lte":
        mongoOperator["$lte"] = sales;
        break;
      default:
        mongoOperator = sales;
        break;
    }
    const filter = { sales: mongoOperator };
    let cursor = snippetCollection.find(filter);
    let rows = await cursor.toArray();
    return rows;
  } catch (ex) {
    console.log(ex);
    throw (ex);
  }
}

module.exports.getBySalesRange = async (lowerLimit, upperLimit, includeExtremes) => {
  try {
    const range = (includeExtremes) ? 
        {"$gte":lowerLimit, "$lte":upperLimit} :
        {"$gt":lowerLimit, "$lt":upperLimit}
    ;
    const filter = { sales: range };
    let cursor = snippetCollection.find(filter);
    let rows = await cursor.toArray();
    return rows;
  } catch (ex) {
    console.log(ex);
    throw (ex);
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

// Operadores en Mongodb son distintos

/*
Select * from snippets where sales = 3;

db.snippets.find({sales:3});


select * from snippets where sales > 50; greater than 
select * from snippets where sales < 50; less than
select * from snippets where sales >= 80; greater than or equal
select * from snippets where sales <= 40;

db.snippets.find({sales: {$gt : 50} })
db.snippets.find({sales: {$lt : 50} })
db.snippets.find({sales: {$gte : 80} })
db.snippets.find({sales: {$lte : 40} })

select * from snippets where sales > 20 and sales < 30;

db.snippets.find({sales : {$gt:20, $lt:30} });

*/
