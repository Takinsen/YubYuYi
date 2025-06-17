// api/index.js  --- this **is** the serverless function Vercel executes
import dotenv from 'dotenv';
import connectDB from '../config/mongo.js';
import app from '../app.js';

dotenv.config();

// -- Cold‑start DB connection cache ----------------------------------
let cached = global.mongoose;                   // reuse across hot reloads (vercel dev)
if (!cached) cached = global.mongoose = { conn: null, promise: null };

async function dbConnectOnce() {
  if (cached.conn) return cached.conn;          // already connected
  if (!cached.promise) {
    cached.promise = connectDB();               // your existing connectDB returns the connection
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

// -- Vercel entry point ----------------------------------------------
export default async function handler(req, res) {
  try {
    await dbConnectOnce();                      // connect on cold‑start only
    return app(req, res);                       // hand off to Express
  } catch (err) {
    console.error('💥 Handler error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
