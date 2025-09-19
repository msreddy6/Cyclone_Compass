const { getCollection } = require('../db');
const { ObjectId } = require('mongodb');

class Dorm {
  static _coll() {
    return getCollection('dorms');
  }

  static async findAll() {
    return this._coll().find().sort({ createdAt: -1 }).toArray();
  }

  static async findById(id) {
    if (!ObjectId.isValid(id)) return null;
    return this._coll().findOne({ _id: new ObjectId(id) });
  }

  static async create(data) {
    const now = new Date();
    const doc = {
      name: data.name,
      description: data.description || '',
      img: data.img || '',
      createdAt: now,
      updatedAt: now
    };
    const result = await this._coll().insertOne(doc);
    return { _id: result.insertedId, ...doc };
  }

  static async update(id, data) {
    if (!ObjectId.isValid(id)) return null;
    const now = new Date();
    const filter = { _id: new ObjectId(id) };
    const updateOps = {
      $set: {
        name: data.name,
        description: data.description || '',
        img: data.img || '',
        updatedAt: now
      }
    };
    const result = await this._coll().updateOne(filter, updateOps);
    if (result.matchedCount === 0) {
      return null;
    }
    return this.findById(id);
  }

  static async delete(id) {
    if (!ObjectId.isValid(id)) return false;
    const result = await this._coll().deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }
}

module.exports = Dorm;