const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');

// ✅ GET all restaurants
router.get('/restaurants', async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ✅ GET restaurants by cuisine
router.get('/restaurants/cuisine/:cuisine', async (req, res) => {
    try {
        const restaurants = await Restaurant.find({ cuisine: req.params.cuisine });
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ✅ GET restaurants sorted by restaurant_id
router.get('/restaurants/sorted', async (req, res) => {
    try {
        const sortOrder = req.query.sortBy === 'ASC' ? 1 : -1;
        const restaurants = await Restaurant.find({}, { _id: 1, cuisine: 1, name: 1, city: 1, restaurant_id: 1 })
                                           .sort({ restaurant_id: sortOrder });
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ✅ GET Delicatessen restaurants outside Brooklyn
router.get('/restaurants/delicatessen', async (req, res) => {
    try {
        const restaurants = await Restaurant.find(
            { cuisine: "Delicatessen", city: { $ne: "Brooklyn" } },
            { _id: 0, cuisine: 1, name: 1, city: 1 }
        ).sort({ name: 1 });

        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
