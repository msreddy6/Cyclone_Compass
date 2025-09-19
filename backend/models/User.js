const { getCollection } = require('../db');
const { ObjectId }      = require('mongodb');

class User {
  static _coll() {
    return getCollection('users');
  }

  // new helper
  static async findByEmail(email) {
    return this._coll().findOne({ email });
  }

  // existing helper
  static async findByUsername(username) {
    return this._coll().findOne({ username });
  }

  static async findAll() {
    return this._coll()
      .find({}, { projection: { password: 0 } })
      .sort({ createdAt: -1 })
      .toArray();
  }

  static async findById(id) {
    return this._coll().findOne(
      { _id: new ObjectId(id) },
      { projection: { password: 0 } }
    );
  }

  static async create(data) {
    const now = new Date();
    const doc = {
      username:  data.username,
      email:     data.email,
      password:  data.password,
      role:      data.role || 'user',
      createdAt: now,
      updatedAt: now
    };
    const result = await this._coll().insertOne(doc);
    // strip out password in return
    const { password, ...user } = doc;
    return { _id: result.insertedId, ...user };
  }

  static async update(id, data) {
    const now = new Date();
    const updateFields = { updatedAt: now };
    if (data.username) updateFields.username = data.username;
    if (data.email)    updateFields.email    = data.email;
    if (data.password) updateFields.password = data.password;
    if (data.role)     updateFields.role     = data.role;

    const { value } = await this._coll().findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateFields },
      {
        returnDocument: 'after',
        projection:     { password: 0 }
      }
    );
    return value;
  }

  static async delete(id) {
    const result = await this._coll().deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }
}

module.exports = User;
