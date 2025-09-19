const express = require('express');
const cors    = require('cors');
const { connect } = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const dormRoutes        = require('./routes/dorms');
const diningRoutes      = require('./routes/dining');
const clubRoutes        = require('./routes/clubs');
const tshirtRoutes      = require('./routes/tshirts');
const authRoutes        = require('./routes/auth');
const reviewRoutes      = require('./routes/reviews');
const testimonialRoutes = require('./routes/testimonials');
const userRoutes        = require('./routes/users');

async function start() {
  await connect(); // wait for MongoClient

  // mount all your routes
  app.use('/api/dorms',        dormRoutes);
  app.use('/api/dining',       diningRoutes);
  app.use('/api/clubs',        clubRoutes);
  app.use('/api/tshirts',      tshirtRoutes);
  app.use('/api/auth',         authRoutes);
  app.use('/api/reviews',      reviewRoutes);
  app.use('/api/testimonials', testimonialRoutes);
  app.use('/api/users',        userRoutes);

  // health check
  app.get('/', (req, res) => res.send('API is running'));

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server listening on http://localhost:${PORT}`);
  });
}

start().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
