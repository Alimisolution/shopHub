import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import paymentRoutes from './routes/payment.js'; // adjust path if needed

const app = express();

// ✅ Allow requests from Netlify site AND localhost
const allowedOrigins = [
  'http://localhost:5173',
  'https://e-store-shophub.netlify.app' 
];

app.use(cors({ 
  origin: allowedOrigins, 
  credentials: true 
}));

app.use(express.json());
app.use('/api/payment', paymentRoutes);
console.log('✅ /api/payment routes mounted');

app.get('/', (req, res) => {
  res.json({ message: 'ShopHub Backend is live!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});