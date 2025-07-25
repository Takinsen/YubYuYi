import app from './app.js';
import dotenv from 'dotenv';
import http from 'http';

// Import Config
import connectDB from './config/mongo.js';

dotenv.config();

// -------------------------- Initialize Variable -------------------------- //
const server = http.createServer(app); 

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

        server.listen(PORT , '0.0.0.0', () => {
            console.log(`🎉 ${process.env.PROJECT_NAME} backend server is live 🎉`);
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