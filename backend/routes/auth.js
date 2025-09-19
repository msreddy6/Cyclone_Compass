const express = require('express');
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const { getCollection } = require('../db');
const User    = require('../models/User');
require('dotenv').config();

const router = express.Router();
const JWT_SECRET    = process.env.JWT_SECRET   || 'SECRET123';
const ADMIN_EMAIL   = process.env.ADMIN_EMAIL  || 'admin@cyclone.com';
const ADMIN_PASSWORD= process.env.ADMIN_PASS   || 'admin123';

// 👤 USER SIGNUP
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const coll = getCollection('users');

    // check existing email
    const exists = await coll.findOne({ email });
    if (exists) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // hash & create
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashed, role: 'user' });

    res.status(201).json({ message: 'Signup successful', user });
  } catch (err) {
    console.error('POST /api/auth/signup error:', err);
    res.status(500).json({ error: err.message });
  }
});

// 🔐 USER LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const coll = getCollection('users');

    // find by email
    const userDoc = await coll.findOne({ email });
    if (!userDoc) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // verify password
    const match = await bcrypt.compare(password, userDoc.password);
    if (!match) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // sign token
    const token = jwt.sign(
      { id: userDoc._id, role: userDoc.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    // return safe user info
    const user = {
      id:       userDoc._id,
      username: userDoc.username,
      role:     userDoc.role
    };

    res.json({ token, user });
  } catch (err) {
    console.error('POST /api/auth/login error:', err);
    res.status(500).json({ error: err.message });
  }
});

// 🔒 STATIC ADMIN LOGIN
router.post('/admin/login', (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const adminUser = {
      id:       'static_admin',
      username: 'admin',
      role:     'admin'
    };

    const token = jwt.sign(adminUser, JWT_SECRET, { expiresIn: '1d' });
    return res.json({ token, user: adminUser });
  }

  return res.status(401).json({ error: 'Invalid email or password' });
});

module.exports = router;
