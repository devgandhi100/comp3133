require('dotenv').config();
const mongoose = require('./config'); // Ensure database is connected
const Restaurant = require('./models/Restaurant');

const restaurantsData = [
    {
        "address": {
            "building": "1008",
            "street": "Morris Park Ave",
            "zipcode": "10462"
        },
        "city": "Bronx",
        "cuisine": "Bakery",
        "name": "Morris Park Bake Shop",
        "restaurant_id": "30075445"
    },
    {
        "address": {
            "street": "Thai Son Street",
            "zipcode": null
        },
        "city": "Manhattan",
        "cuisine": "Vietnamese",
        "name": "Pho Me Long Time",
        "restaurant_id": "30075455"
    }
];

// Function to insert data into MongoDB
async function insertData() {
    try {
        await mongoose.connection.db.collection('restaurants').deleteMany(); // Ensure fresh data
        await Restaurant.insertMany(restaurantsData);
        console.log("✅ Data successfully inserted!");
        mongoose.connection.close(); // Close connection after inserting
        process.exit();
    } catch (err) {
        console.error("❌ Error inserting data:", err);
        process.exit(1);
    }
}

// Ensure MongoDB is connected before inserting data
mongoose.connection.once('open', insertData);
