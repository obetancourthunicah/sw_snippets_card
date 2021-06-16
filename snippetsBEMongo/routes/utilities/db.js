const mongoClient = require('mongodb').MongoClient;
let _db;
const userName =  process.env.MONGODBUSER;
const password = process.env.MONGODBPSWD;
const mongohost = process.env.MONGOHOST;
const mongodb = process.env.MONGODB;
const mongoUri = `mongodb+srv://${userName}:${password}@${mongohost}?retryWrites=true&w=majority`
const mongoParams = { useUnifiedTopology: true };

class MongoDB{
  static async getDB(){
    if (!_db) {
      try {
        let client = await mongoClient.connect(
          mongoUri,
          mongoParams
        );
        _db = client.db(mongodb);
        return _db;
      } catch (ex){
        console.log(ex);
        throw(ex);
      }
    } else {
      return _db;
    }
  }
}

module.exports = MongoDB;
