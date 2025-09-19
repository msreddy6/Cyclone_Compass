const express = require('express');
const router  = express.Router();
const Review  = require('../models/Review');

// GET /api/reviews?productId=xxx&type=dorm
router.get('/', async (req, res) => {
  const { productId, type } = req.query;
  try {
    const reviews = await Review.findAll(productId, type);
    res.json(reviews);
  } catch (err) {
    console.error('GET /api/reviews error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/reviews
router.post('/', async (req, res) => {
  try {
    const created = await Review.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    console.error('POST /api/reviews error:', err.message);
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/reviews/:id
router.put('/:id', async (req, res) => {
  try {
    const updated = await Review.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Review not found' });
    res.json(updated);
  } catch (err) {
    console.error('PUT /api/reviews/:id error:', err.message);
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/reviews/:id
router.delete('/:id', async (req, res) => {
  try {
    const ok = await Review.delete(req.params.id);
    if (!ok) return res.status(404).json({ error: 'Review not found' });
    res.json({ success: true });
  } catch (err) {
    console.error('DELETE /api/reviews/:id error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
