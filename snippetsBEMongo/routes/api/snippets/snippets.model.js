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

module.exports.getAllFacet = async (page, itemsPerPage) => {
  try {
    let options = {
      skip: (page - 1) * itemsPerPage,
      limit: itemsPerPage,
      projection: {name:1, sales:1, keywords:1},
      sort:[["name", 1]]
    };

    let docsCursor = snippetCollection.find({}, options);
    let rownum = await docsCursor.count();
    let rows = await docsCursor.toArray()
    return {rownum, rows};
  } catch (ex) {
    console.log(ex);
    throw (ex);
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

module.exports.addKeyword = async (id, keyword) =>{
  try {
    const _id = new ObjectId(id);
    const filter = {"_id": _id};
    const updateObj = {"$push":{"keywords": keyword}};
    let result = await snippetCollection.updateOne(filter, updateObj);
    return result;
  } catch(ex) {
    console.log(ex);
    throw(ex);
  }
}

module.exports.addKeywords = async (id, keywords) => {
  try {
    const _id = new ObjectId(id);
    const filter = { "_id": _id };
    const updateObj = { "$set": { "keywords": keywords.split(",") } };
    let result = await snippetCollection.updateOne(filter, updateObj);
    return result;
  } catch (ex) {
    console.log(ex);
    throw (ex);
  }
}

module.exports.getByKeyword = async (keyword) => {
  try {
    const filter = { "keywords": keyword };
    let cursor = snippetCollection.find(filter);
    let rows = await cursor.toArray();
    return rows;
  } catch (ex) {
    console.log(ex);
    throw (ex);
  }
}

module.exports.getByCommentUser = async (email)=>{
  try{
    const filter = {"comments.email": email};
    let cursor = snippetCollection.find(filter, { projection:{name:1, sales:1} });
    let rows = await cursor.toArray();
    return rows;
  }catch(ex){
    console.log(ex);
    throw(ex);
  }
}

module.exports.deleteById = async (id) => {
  try {
    const _id = new ObjectId(id);
    const filter = { _id: _id };
    let row = await snippetCollection.deleteOne(filter);
    return row;
  } catch (ex) {
    console.log(ex);
    throw (ex);
  }
}

module.exports.getSalesFreq = async () => {
  try {
  let pipeline = [];
  // Agrupo por el valor de sales y suma 1 por cada documento
  pipeline.push(
    {
      "$group": 
        {
          _id: "$sales",
          salesAmount: {
              $sum: 1
          }
      }
    });
   // Ordena los documentos resultantes del $group de forma descendiente 
   // por el conteo
   pipeline.push({
      "$sort": {
        salesAmount: -1
      }
    });
    //Limitamos el numero de documentos despues del sort
    pipeline.push(
      {"$limit": 5}
    );

    let cursor = snippetCollection.aggregate(pipeline);
    let rows = await cursor.toArray();
    return rows;
  } catch(ex){
    console.log(ex);
    throw (ex);
  }
}

//   _id: ObjectID("afasdasdccasb102938")

// select sales, count(*) as salesAmount from snippets group by sales;

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

select count(sales) from snippets;

MySQL

select count(*) from snippets; 
Pagin 1 50
select * from snippets limit (1, 50);
select * from snippets limit (51, 100);

select * from snippets order by sales, name;

0 name , 1 sales

0 sales, 1 name

json (no determina orden)

{name:1, sales:1} === {sales:1, name:1}

["names", "sales"] !== ["sales", "names"]

0, 1



*/
