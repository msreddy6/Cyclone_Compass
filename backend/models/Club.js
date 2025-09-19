const { getCollection } = require('../db');
const { ObjectId }      = require('mongodb');

class Club {
  static _coll() {
    return getCollection('clubs');
  }

  // get all clubs
  static async findAll() {
    return this._coll().find().sort({ createdAt: -1 }).toArray();
  }

  // get one by ID
  static async findById(id) {
    return this._coll().findOne({ _id: new ObjectId(id) });
  }

  // create new
  static async create(data) {
    const now = new Date();
    const doc = {
      name:        data.name,
      description: data.description,
      img:         data.img,
      createdAt:   now,
      updatedAt:   now
    };
    const result = await this._coll().insertOne(doc);
    return { _id: result.insertedId, ...doc };
  }

  // update existing
  static async update(id, data) {
    const now = new Date();
    const { value } = await this._coll().findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: {
          name:        data.name,
          description: data.description,
          img:         data.img,
          updatedAt:   now
        }
      },
      { returnDocument: 'after' }
    );
    return value;
  }

  // delete by ID
  static async delete(id) {
    const result = await this._coll().deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }
}

module.exports = Club;
