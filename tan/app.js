import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'

// Import Routes V1
import authRoutes from "./routes/v1/authRoutes.js";
import durianRoutes from "./routes/v1/durianRoutes.js";
import farmRoutes from "./routes/v1/farmRoutes.js";
import houseRoutes from "./routes/v1/houseRoutes.js";
import lotRoutes from "./routes/v1/lotRoutes.js";
import shippingRoutes from "./routes/v1/shippingRoutes.js";
import inspectLogRoutes from "./routes/v1/inspectLogRoutes.js";

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

app.use("/api/v1/user", authRoutes);
app.use("/api/v1/durian", durianRoutes);
app.use("/api/v1/farm", farmRoutes);
app.use("/api/v1/house", houseRoutes);
app.use("/api/v1/lot", lotRoutes);
app.use("/api/v1/shipping", shippingRoutes);
app.use("/api/v1/inspectLog", inspectLogRoutes);

export default app