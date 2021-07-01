const MongoDB = require('../../utilities/db');
const ObjectId = require('mongodb').ObjectID;
const bcrypt = require("bcryptjs");
let db;
let securityCollection;

//se ejecuta cuando se manda a require(este archivo)
(async function () {
  try {
    if (!securityCollection) {
      db = await MongoDB.getDB();
      securityCollection = db.collection("security");
      if (process.env.ENSURE_INDEX == 1) {
        // Vamos a asegurarnos de que exista el indice
      }
    }
  } catch (ex) {
    console.log(ex);
    process.exit(1);
  }
})();

module.exports.registerUser = async (email, password)=>{
  try {
    let user = {
      email:email,
      password: await bcrypt.hash(password, 10),
      lastlogin: null,
      lastpasswordchanged:null,
      passwordexpires: new Date().getTime() + (30 * 24 * 60 * 60 * 1000),
      oldpasswords:[],
      roles:["public"]
    }
    let result = await securityCollection.insertOne(user);
    return result.ops[0];
  }
  catch (ex){
    console.log(ex);
    throw(ex);
  }
}

module.exports.getByEmail = async (email)=>{
  try {
    const filter = {email:email};
    let user = await securityCollection.findOne(filter);
    return user;
  }catch(ex){
    console.log(ex);
    throw(ex);
  }
}

module.exports.comparePasswords = async (rawPassword, cryptedPassword)=>{
  try{
    return await bcrypt.compare(rawPassword, cryptedPassword);
  }catch(ex){
    console.log(ex);
    throw(ex);
  }
}
