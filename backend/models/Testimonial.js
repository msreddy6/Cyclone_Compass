const { getCollection } = require('../db');
const { ObjectId }      = require('mongodb');

class Testimonial {
  static _coll() {
    return getCollection('testimonials');
  }

  // Fetch all testimonials, most recent first
  static async findAll() {
    return this._coll()
      .find()
      .sort({ createdAt: -1 })
      .toArray();
  }

  // Fetch one by ID
  static async findById(id) {
    return this._coll().findOne({ _id: new ObjectId(id) });
  }

  // Create a new testimonial
  static async create(data) {
    const now = new Date();
    const doc = {
      author:    data.author,
      quote:     data.quote,
      avatarUrl: data.avatarUrl || '',
      createdAt: now,
      updatedAt: now
    };
    const result = await this._coll().insertOne(doc);
    return { _id: result.insertedId, ...doc };
  }

  // Update an existing testimonial
  static async update(id, data) {
    const now = new Date();
    const { value } = await this._coll().findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          author:    data.author,
          quote:     data.quote,
          avatarUrl: data.avatarUrl || '',
          updatedAt: now
        }
      },
      { returnDocument: 'after' }
    );
    return value;
  }

  // Delete a testimonial by ID
  static async delete(id) {
    const result = await this._coll().deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }
}

module.exports = Testimonial;
