const express = require('express');
const router  = express.Router();
const Testimonial = require('../models/Testimonial');

// GET all testimonials
router.get('/', async (req, res) => {
  try {
    const list = await Testimonial.findAll();
    res.json(list);
  } catch (err) {
    console.error('GET /api/testimonials error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// POST new testimonial
router.post('/', async (req, res) => {
  try {
    const created = await Testimonial.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    console.error('POST /api/testimonials error:', err.message);
    res.status(400).json({ error: err.message });
  }
});

// PUT update testimonial
router.put('/:id', async (req, res) => {
  try {
    const updated = await Testimonial.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }
    res.json(updated);
  } catch (err) {
    console.error('PUT /api/testimonials/:id error:', err.message);
    res.status(400).json({ error: err.message });
  }
});

// DELETE testimonial
router.delete('/:id', async (req, res) => {
  try {
    const ok = await Testimonial.delete(req.params.id);
    if (!ok) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }
    res.json({ success: true });
  } catch (err) {
    console.error('DELETE /api/testimonials/:id error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
