// const express = require('express');
// const router  = express.Router();
// const Dorm    = require('../models/Dorm');

// // GET all dorms
// router.get('/', async (req, res) => {
//   try {
//     const dorms = await Dorm.findAll();
//     res.json(dorms);
//   } catch (err) {
//     console.error('GET /api/dorms error:', err.message);
//     res.status(500).json({ error: err.message });
//   }
// });

// // POST a new dorm
// router.post('/', async (req, res) => {
//   try {
//     const created = await Dorm.create(req.body);
//     res.status(201).json(created);
//   } catch (err) {
//     console.error('POST /api/dorms error:', err.message);
//     res.status(400).json({ error: err.message });
//   }
// });

// // PUT (update) a dorm by ID
// router.put('/:id', async (req, res) => {
//   try {
//     const updated = await Dorm.update(req.params.id, req.body);
//     if (!updated) {
//       return res.status(404).json({ error: 'Dorm not found' });
//     }
//     res.json(updated);
//   } catch (err) {
//     console.error('PUT /api/dorms/:id error:', err.message);
//     res.status(400).json({ error: err.message });
//   }
// });

// // DELETE a dorm by ID
// router.delete('/:id', async (req, res) => {
//   try {
//     const ok = await Dorm.delete(req.params.id);
//     if (!ok) {
//       return res.status(404).json({ error: 'Dorm not found' });
//     }
//     res.json({ success: true });
//   } catch (err) {
//     console.error('DELETE /api/dorms/:id error:', err.message);
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;

// const express   = require('express');
// const router    = express.Router();
// const Dorm      = require('../models/Dorm');
// const { ObjectId } = require('mongodb');

// // GET one dorm by ID
// router.get('/:id', async (req, res) => {
//   const { id } = req.params;

//   // optional: validate ObjectId early
//   if (!ObjectId.isValid(id)) {
//     return res.status(400).json({ error: 'Invalid dorm ID' });
//   }

//   try {
//     const dorm = await Dorm.findById(id);
//     if (!dorm) {
//       return res.status(404).json({ error: 'Dorm not found' });
//     }
//     res.json(dorm);
//   } catch (err) {
//     console.error(`GET /api/dorms/${id} error:`, err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // GET all dorms
// router.get('/', async (req, res) => {
//   try {
//     const dorms = await Dorm.findAll();
//     res.json(dorms);
//   } catch (err) {
//     console.error('GET /api/dorms error:', err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // POST a new dorm
// router.post('/', async (req, res) => {
//   try {
//     const created = await Dorm.create(req.body);
//     res.status(201).json(created);
//   } catch (err) {
//     console.error('POST /api/dorms error:', err);
//     res.status(400).json({ error: err.message });
//   }
// });

// // PUT (update) a dorm by ID
// router.put('/:id', async (req, res) => {
//   if (!ObjectId.isValid(req.params.id)) {
//     return res.status(400).json({ error: 'Invalid dorm ID' });
//   }

//   try {
//     const updated = await Dorm.update(req.params.id, req.body);
//     if (!updated) {
//       return res.status(404).json({ error: 'Dorm not found' });
//     }
//     res.json(updated);
//   } catch (err) {
//     console.error(`PUT /api/dorms/${req.params.id} error:`, err);
//     res.status(400).json({ error: err.message });
//   }
// });

// // DELETE a dorm by ID
// router.delete('/:id', async (req, res) => {
//   if (!ObjectId.isValid(req.params.id)) {
//     return res.status(400).json({ error: 'Invalid dorm ID' });
//   }

//   try {
//     const ok = await Dorm.delete(req.params.id);
//     if (!ok) {
//       return res.status(404).json({ error: 'Dorm not found' });
//     }
//     res.json({ success: true });
//   } catch (err) {
//     console.error(`DELETE /api/dorms/${req.params.id} error:`, err);
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;

const express     = require('express');
const router      = express.Router();
const { ObjectId } = require('mongodb');
const Dorm        = require('../models/Dorm');

// GET all dorms
router.get('/', async (req, res) => {
  try {
    const dorms = await Dorm.findAll();
    res.json(dorms);
  } catch (err) {
    console.error('GET /api/dorms error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET one dorm by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid dorm ID' });
  }

  try {
    const dorm = await Dorm.findById(id);
    if (!dorm) {
      return res.status(404).json({ error: 'Dorm not found' });
    }
    res.json(dorm);
  } catch (err) {
    console.error(`GET /api/dorms/${id} error:`, err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST a new dorm
router.post('/', async (req, res) => {
  try {
    const created = await Dorm.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    console.error('POST /api/dorms error:', err);
    res.status(400).json({ error: err.message });
  }
});

// PUT (update) a dorm by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  console.log('PUT /api/dorms/:id called with', id, req.body);

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid dorm ID' });
  }

  try {
    const updated = await Dorm.update(id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Dorm not found' });
    }
    res.json(updated);
  } catch (err) {
    console.error(`PUT /api/dorms/${id} error:`, err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE a dorm by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid dorm ID' });
  }

  try {
    const ok = await Dorm.delete(id);
    if (!ok) {
      return res.status(404).json({ error: 'Dorm not found' });
    }
    res.json({ success: true });
  } catch (err) {
    console.error(`DELETE /api/dorms/${id} error:`, err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
