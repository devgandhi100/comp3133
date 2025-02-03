require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());

// ✅ Connect to MongoDB with Debugging Enabled
mongoose.set('debug', true);  // Enables debugging (optional)

mongoose.connect(MONGO_URI, {
    serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
    connectTimeoutMS: 30000, // Increase connection timeout
    tlsAllowInvalidCertificates: true, // Fix SSL issues
})
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// ✅ Handle Mongoose Connection Errors
mongoose.connection.on('error', err => {
    console.error("❌ Mongoose Connection Error:", err);
});

// Routes
const restaurantRoutes = require('./routes/restaurant');
app.use('/api', restaurantRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
