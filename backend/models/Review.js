const { getCollection } = require('../db');
const { ObjectId }      = require('mongodb');

class Review {
  static _coll() {
    return getCollection('reviews');
  }

  /**
   * Fetch all reviews, optionally filtered by productId and type.
   * @param {string} productId 
   * @param {string} type 
   * @returns {Promise<Array>}
   */
  static async findAll(productId = null, type = null) {
    const filter = {};
    if (productId) filter.productId = productId;
    if (type)      filter.type      = type;
    return this._coll()
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray();
  }

  /**
   * Fetch a single review by its ID.
   * @param {string} id 
   * @returns {Promise<Object|null>}
   */
  static async findById(id) {
    return this._coll().findOne({ _id: new ObjectId(id) });
  }

  /**
   * Create a new review.
   * @param {Object} data 
   * @param {string} data.productId
   * @param {string} data.type
   * @param {string} data.user
   * @param {string} data.text
   * @param {number} data.rating
   * @returns {Promise<Object>}
   */
  static async create(data) {
    const now = new Date();
    const doc = {
      productId: data.productId,
      type:      data.type,
      user:      data.user,
      text:      data.text,
      rating:    data.rating,
      createdAt: now,
      updatedAt: now
    };
    const result = await this._coll().insertOne(doc);
    return { _id: result.insertedId, ...doc };
  }

  /**
   * Update an existing review.
   * @param {string} id 
   * @param {Object} data 
   * @returns {Promise<Object|null>}
   */
  static async update(id, data) {
    const now = new Date();
    const { value } = await this._coll().findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: {
          text:      data.text,
          rating:    data.rating,
          updatedAt: now
        }
      },
      { returnDocument: 'after' }
    );
    return value;
  }

  /**
   * Delete a review by its ID.
   * @param {string} id 
   * @returns {Promise<boolean>}
   */
  static async delete(id) {
    const result = await this._coll().deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }
}

module.exports = Review;
