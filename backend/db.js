import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// MongoDB Connection with better error handling
export const connectDB = async () => {
    try {
        console.log('Attempting to connect to MongoDB...');
        console.log('MongoDB URI:', process.env.MONGODB_URI);

        const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/edutrade', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Successfully connected to MongoDB.');
        console.log('Database Name:', conn.connection.db.databaseName);

        // List all collections
        const collections = await conn.connection.db.listCollections().toArray();
        console.log('Available collections:', collections.map(c => c.name));

        // Handle connection events
        mongoose.connection.on('error', err => {
            console.error('MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });

        // Handle process termination
        process.on('SIGINT', async () => {
            try {
                await mongoose.connection.close();
                console.log('MongoDB connection closed through app termination');
                process.exit(0);
            } catch (err) {
                console.error('Error during MongoDB connection closure:', err);
                process.exit(1);
            }
        });

        return conn;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

// Function to check database status
export const checkDBStatus = async () => {
    try {
        const collections = await mongoose.connection.db.listCollections().toArray();
        const dbStats = await mongoose.connection.db.stats();
        
        return {
            status: 'Connected',
            database: mongoose.connection.db.databaseName,
            collections: collections.map(c => c.name),
            stats: dbStats
        };
    } catch (error) {
        return {
            status: 'Error',
            error: error.message,
            stack: error.stack
        };
    }
}; 