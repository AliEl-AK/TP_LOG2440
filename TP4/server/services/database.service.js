const { MongoClient, ServerApiVersion } = require('mongodb');
const DB_CONSTS = require("../utils/env");

class DatabaseService {
  /**
   * Populates a collection with data only if the collection is empty.
   * @param {string} collectionName - The name of the collection in MongoDB.
   * @param {Array} data - An array of documents to insert into the collection.
   */
  async populateDb(collectionName, data) {
    const collection = this.client.db(DB_CONSTS.DB_DB).collection(collectionName);
    

    if ((await (collection.find({}).toArray())).length === 0) {
      await collection.insertMany(data);
    await this.client.db(DB_CONSTS.DB_DB).collection(collectionName).insertMany(data);
  }
  }


  // Méthode pour établir la connection entre le serveur Express et la base de données MongoDB
  async connectToServer(uri) {
    try {
      this.client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      });
      await this.client.connect();
      this.db = this.client.db(DB_CONSTS.DB_DB);
      // eslint-disable-next-line no-console
      console.log('Successfully connected to MongoDB.');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }
}

const dbService = new DatabaseService();

module.exports = { dbService };
