import app from './app.js';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';

// Import Config
import connectDB from './config/mongo.js';
// import redisClient from './config/redis.js';
import setupSocket from './config/socket.js';

dotenv.config();

// -------------------------- Initialize Variable -------------------------- //
const server = http.createServer(app); 
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }
});

// -------------------------- Start the Server -------------------------- //

const PORT = process.env.PORT || 8000;

const initializeServer = async () =>{
    try{
        console.log(`🚀 Starting ${process.env.PROJECT_NAME} backend server...`);
        
        // MongoDB Connection
        console.log('🔗 Connecting to MongoDB...');
        await connectDB(); 
        
        // // Redis Connection
        // console.log('🔗 Connecting to Redis...');
        // await redisClient.connect();

        setupSocket(io);

        server.listen(PORT , '0.0.0.0', () => {
            console.log(`🎉 ${process.env.PROJECT_NAME} backend server is live at ${process.env.BACKEND_URL} 🎉`);
        });
    }
    catch(err){
        console.log(`❌ Failed to start the ${process.env.PROJECT_NAME} backend server:`, err);
    }
}

initializeServer();

// -------------------------- Shutdown the Server -------------------------- //

const shutdown = async () => {
    console.log('\n🛑 Shutting down gracefully...');
    try {
        await redisClient.quit(); 
        server.close(() => {
            console.log('🔒 HTTP server closed.');
            process.exit(0); 
        });
    } catch (err) {
        console.error('❌ Error during shutdown:', err);
        process.exit(1);
    }
};

process.on('SIGINT', shutdown);  
process.on('SIGTERM', shutdown); 

export { io };