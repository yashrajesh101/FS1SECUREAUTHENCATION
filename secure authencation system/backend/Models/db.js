const mongoose = require('mongoose');

const mongo_url = process.env.MONGO_CONN;

if (!mongo_url) {
    console.error("❌ MongoDB connection URL is missing in environment variables.");
    process.exit(1); // Exit the application if DB URL is not provided
}

mongoose.connect(mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('✅ MongoDB Connected Successfully...'))
    .catch((err) => {
        console.error('❌ MongoDB Connection Error:', err);
        process.exit(1); // Exit if unable to connect
    });

// Handle connection errors after initial connection
mongoose.connection.on('error', (err) => {
    console.error('❌ MongoDB Error:', err);
});

// Graceful shutdown (handles app termination)
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('🔴 MongoDB Disconnected. Exiting...');
    process.exit(0);
});
