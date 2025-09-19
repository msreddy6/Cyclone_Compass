const express = require('express');
const router  = express.Router();
const Dining  = require('../models/Dining');

// GET all dining centers
router.get('/', async (req, res) => {
  try {
    const list = await Dining.findAll();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new dining center
router.post('/', async (req, res) => {
  try {
    const created = await Dining.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update a dining center by ID
router.put('/:id', async (req, res) => {
  try {
    const updated = await Dining.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a dining center by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Dining.delete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
