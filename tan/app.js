import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'

// Import Routes V1
import authRoutes from "./routes/v1/authRoutes.js";
import durianRoutes from "./routes/v1/durianRoutes.js";

const app = express();

// -------------------------- Configuration -------------------------- //

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());

// -------------------------- API Routing -------------------------- // 

app.use("/api/user", authRoutes);
app.use("/api/durian", durianRoutes);

export default app