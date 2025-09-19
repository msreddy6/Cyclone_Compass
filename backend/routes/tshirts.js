const express = require('express');
const router  = express.Router();
const TShirt  = require('../models/TShirt');

// GET all t-shirts
router.get('/', async (req, res) => {
  try {
    const list = await TShirt.findAll();
    res.json(list);
  } catch (err) {
    console.error('GET /api/tshirts error:', err);
    res.status(500).json({ error: err.message });
  }
});

// GET one t-shirt by ID
router.get('/:id', async (req, res) => {
  try {
    const item = await TShirt.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'T-Shirt not found' });
    }
    res.json(item);
  } catch (err) {
    console.error('GET /api/tshirts/:id error:', err);
    res.status(400).json({ error: err.message });
  }
});

// POST create a new t-shirt
router.post('/', async (req, res) => {
  try {
    const created = await TShirt.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    console.error('POST /api/tshirts error:', err);
    res.status(400).json({ error: err.message });
  }
});

// PUT update a t-shirt by ID
router.put('/:id', async (req, res) => {
  try {
    const updated = await TShirt.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'T-Shirt not found' });
    }
    res.json(updated);
  } catch (err) {
    console.error('PUT /api/tshirts/:id error:', err);
    res.status(400).json({ error: err.message });
  }
});

// DELETE a t-shirt by ID
router.delete('/:id', async (req, res) => {
  try {
    const ok = await TShirt.delete(req.params.id);
    if (!ok) {
      return res.status(404).json({ error: 'T-Shirt not found' });
    }
    res.json({ success: true });
  } catch (err) {
    console.error('DELETE /api/tshirts/:id error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
