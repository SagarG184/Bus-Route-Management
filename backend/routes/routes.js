const express = require('express');
const router = express.Router();
const Route = require('../models/Route');
const { auth } = require('../middleware/auth');

// Get all routes
router.get('/', async (req, res) => {
    try {
        const routes = await Route.find();
        res.json(routes);
    } catch (error) {
        console.error('Error fetching routes:', error);
        res.status(500).json({ message: 'Server error while fetching routes' });
    }
});

// Get a specific route by ID
router.get('/:id', async (req, res) => {
    try {
        const route = await Route.findById(req.params.id);
        if (!route) {
            return res.status(404).json({ message: 'Route not found' });
        }
        res.json(route);
    } catch (error) {
        console.error('Error fetching route:', error);
        res.status(500).json({ message: 'Server error while fetching route' });
    }
});

// Add a new route
router.post('/', auth, async (req, res) => {
    try {
        const { 
            name, 
            routeNumber,
            description, 
            path,
            estimatedDuration,
            schedule 
        } = req.body;
        
        // Validate path points
        if (!path || !Array.isArray(path)) {
            return res.status(400).json({ message: 'Path must be an array of points' });
        }

        // Create new route
        const route = new Route({
            name,
            routeNumber,
            description,
            path,
            estimatedDuration,
            schedule
        });

        await route.save();
        res.status(201).json(route);
    } catch (error) {
        console.error('Error creating route:', error);
        res.status(500).json({ message: 'Server error while creating route' });
    }
});

// Update a route
router.put('/:id', auth, async (req, res) => {
    try {
        const { 
            name, 
            routeNumber,
            description, 
            path,
            estimatedDuration,
            schedule 
        } = req.body;

        const route = await Route.findByIdAndUpdate(
            req.params.id,
            {
                name,
                routeNumber,
                description,
                path,
                estimatedDuration,
                schedule
            },
            { new: true, runValidators: true }
        );
        
        if (!route) {
            return res.status(404).json({ message: 'Route not found' });
        }
        
        res.json(route);
    } catch (error) {
        console.error('Error updating route:', error);
        res.status(500).json({ message: 'Server error while updating route' });
    }
});

// Delete a route
router.delete('/:id', auth, async (req, res) => {
    try {
        const route = await Route.findByIdAndDelete(req.params.id);
        
        if (!route) {
            return res.status(404).json({ message: 'Route not found' });
        }
        
        res.json({ message: 'Route deleted successfully' });
    } catch (error) {
        console.error('Error deleting route:', error);
        res.status(500).json({ message: 'Server error while deleting route' });
    }
});

module.exports = router;
