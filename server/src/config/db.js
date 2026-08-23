import mongoose from 'mongoose';

/**
 * Connect to MongoDB instance using Mongoose.
 * Supports connection strings from environment variable MONGODB_URI.
 *
 * @param {string} [customUri] - Optional URI override (used for testing or memory server)
 */
export const connectDB = async (customUri) => {
  const uri = customUri || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bangalore_pincodes';

  try {
    const conn = await mongoose.connect(uri);
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`[Database] Connection Error: ${error.message}`);
    // If not in test mode, exit process on database connection error
    if (process.env.NODE_ENV !== 'test') {
      process.exit(1);
    }
    throw error;
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log('[Database] MongoDB Disconnected');
  } catch (error) {
    console.error(`[Database] Disconnect Error: ${error.message}`);
  }
};
