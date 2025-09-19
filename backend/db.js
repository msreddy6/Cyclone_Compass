// backend/db.js
const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri    = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;
async function connect() {
  await client.connect();
  // use the database name from your URI or set it in .env
  db = client.db(process.env.DB_NAME || 'cc');
  console.log('✅ Connected to MongoDB via MongoClient');
}

function getCollection(name) {
  if (!db) throw new Error('Must connect to DB first');
  return db.collection(name);
}

module.exports = { connect, getCollection };
