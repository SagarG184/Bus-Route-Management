const mongoose = require('mongoose');
const Route = require('../models/Route');
const Bus = require('../models/Bus');
require('dotenv').config();

const sampleRoutes = [
    {
        name: 'Staff Route',
        routeNumber: 'SR-1',
        description: 'NIE Staff Route',
        path: [
            {
                type: 'Point',
                coordinates: [12.2838184, 76.6414748],
                name: 'NIE South Campus',
                isStop: true,
                distance: 0,
                morningTime: '08:00'
            },
            {
                type: 'Point',
                coordinates: [12.2863179, 76.6308853],
                name: "Dr Agarwals Eye Hospital",
                isStop: true,
                distance: 2.5,
                morningTime: '08:10'
            },
            {
                type: 'Point',
                coordinates: [12.286828, 76.6259848],
                name: 'Sri Shanthisagar Complex',
                isStop: true,
                distance: 4.1,
                morningTime: '08:15'
            },
            {
                type: 'Point',
                coordinates: [12.2873558, 76.6174957],
                name: 'Andolana Circle',
                isStop: true,
                distance: 5.8,
                morningTime: '08:20'
            },
            {
                type: 'Point',
                coordinates: [12.2859004, 76.612665],
                name: 'CESC KEB Office',
                isStop: true,
                distance: 7.2,
                morningTime: '08:25'
            },
            {
                type: 'Point',
                coordinates: [12.301443, 76.6051666],
                name: 'Bogadi 2nd Stage',
                isStop: true,
                distance: 9.0,
                morningTime: '08:35'
            },
            {
                type: 'Point',
                coordinates: [12.3411354, 76.5839681],
                name: 'Hootagalli',
                isStop: true,
                distance: 11.5,
                morningTime: '08:45'
            },
            {
                type: 'Point',
                coordinates: [12.371201, 76.5849104],
                name: 'NIE North Campus',
                isStop: true,
                distance: 14.0,
                morningTime: '09:00'
            }
        ],
        estimatedDuration: 60,
        schedule: [
            {
                departureTime: '07:55',
                arrivalTime: '08:55',
                days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
            }
        ]
    },
    {
        name: 'Route-2',
        routeNumber: 'Route-2',
        description: 'NIE City Circle Transportation Route',
        path: [
            {
                type: 'Point',
                coordinates: [76.6394, 12.2958],
                name: 'NIE South Campus',
                isStop: true,
                distance: 0,
                morningTime: '07:55'
            },
            {
                type: 'Point',
                coordinates: [76.6550, 12.3083],
                name: 'Hardinge Circle',
                isStop: true,
                distance: 2.1,
                morningTime: '08:05'
            },
            {
                type: 'Point',
                coordinates: [76.6490, 12.3080],
                name: 'Suburban Bus Stand',
                isStop: true,
                distance: 3.5,
                morningTime: '08:10'
            },
            {
                type: 'Point',
                coordinates: [76.6410, 12.3120],
                name: 'SP Office Circle',
                isStop: true,
                distance: 4.8,
                morningTime: '08:15'
            },
            {
                type: 'Point',
                coordinates: [76.6390, 12.3150],
                name: 'Nexus Centre City',
                isStop: true,
                distance: 5.9,
                morningTime: '08:20'
            },
            {
                type: 'Point',
                coordinates: [76.6600, 12.2950],
                name: 'Gayathri Puram',
                isStop: true,
                distance: 7.2,
                morningTime: '08:25'
            },
            {
                type: 'Point',
                coordinates: [76.6700, 12.3250],
                name: 'PF Office',
                isStop: true,
                distance: 8.5,
                morningTime: '08:30'
            },
            {
                type: 'Point',
                coordinates: [76.6500, 12.3100],
                name: 'Bombay Tiffanys Annexe',
                isStop: true,
                distance: 9.8,
                morningTime: '08:35'
            },
            {
                type: 'Point',
                coordinates: [76.6650, 12.3200],
                name: 'Suryanarayana Temple',
                isStop: true,
                distance: 11.2,
                morningTime: '08:40'
            },
            {
                type: 'Point',
                coordinates: [76.6400, 12.3050],
                name: 'Ganapathi Temple Road',
                isStop: true,
                distance: 12.5,
                morningTime: '08:45'
            },
            {
                type: 'Point',
                coordinates: [76.6400, 12.3300],
                name: 'LIC Circle',
                isStop: true,
                distance: 13.8,
                morningTime: '08:48'
            },
            {
                type: 'Point',
                coordinates: [76.6200, 12.3000],
                name: 'B M Shree Nagar',
                isStop: true,
                distance: 15.1,
                morningTime: '08:50'
            },
            {
                type: 'Point',
                coordinates: [76.6100, 12.3500],
                name: 'GRS Fantasy Park',
                isStop: true,
                distance: 16.4,
                morningTime: '08:52'
            },
            {
                type: 'Point',
                coordinates: [76.6200, 12.3400],
                name: 'Lokanayaka Nagar',
                isStop: true,
                distance: 17.7,
                morningTime: '08:53'
            },
            {
                type: 'Point',
                coordinates: [76.6200, 12.3400],
                name: 'Shubodini Convention Centre',
                isStop: true,
                distance: 18.9,
                morningTime: '08:54'
            },
            {
                type: 'Point',
                coordinates: [76.6400, 12.3000],
                name: 'NIE North Campus',
                isStop: true,
                distance: 20.0,
                morningTime: '08:55'
            }
        ],
        estimatedDuration: 60,
        schedule: [
            {
                departureTime: '07:55',
                arrivalTime: '08:55',
                days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
            }
        ]
    },
    {
        name: 'Route-3',
        routeNumber: 'Route-3',
        description: 'NIE Campus Connector Route via Bogadi',
        path: [
            {
                type: 'Point',
                coordinates: [76.6394, 12.2958],
                name: 'NIE Golden Jubilee Block',
                isStop: true,
                distance: 0,
                morningTime: '07:55'
            },
            {
                type: 'Point',
                coordinates: [76.6394, 12.2958],
                name: 'Boys Hostel South Campus',
                isStop: true,
                distance: 0.2,
                morningTime: '08:00'
            },
            {
                type: 'Point',
                coordinates: [76.6380, 12.2950],
                name: 'Andolana Circle',
                isStop: true,
                distance: 1.5,
                morningTime: '08:10'
            },
            {
                type: 'Point',
                coordinates: [76.6410, 12.3120],
                name: 'Reliance Market',
                isStop: true,
                distance: 3.2,
                morningTime: '08:20'
            },
            {
                type: 'Point',
                coordinates: [76.6500, 12.2950],
                name: 'Nethaji Circle',
                isStop: true,
                distance: 4.8,
                morningTime: '08:25'
            },
            {
                type: 'Point',
                coordinates: [76.6400, 12.3100],
                name: 'Mahamane Circle',
                isStop: true,
                distance: 6.1,
                morningTime: '08:30'
            },
            {
                type: 'Point',
                coordinates: [76.6500, 12.3050],
                name: 'Deepa Bar',
                isStop: true,
                distance: 7.4,
                morningTime: '08:35'
            },
            {
                type: 'Point',
                coordinates: [76.6600, 12.2950],
                name: 'Niveditha Nagar Park',
                isStop: true,
                distance: 8.9,
                morningTime: '08:40'
            },
            {
                type: 'Point',
                coordinates: [76.6200, 12.3100],
                name: 'Bank Colony, Bogadi',
                isStop: true,
                distance: 10.3,
                morningTime: '08:45'
            },
            {
                type: 'Point',
                coordinates: [76.6200, 12.3100],
                name: 'Bogadi (Halli)',
                isStop: true,
                distance: 11.5,
                morningTime: '08:50'
            },
            {
                type: 'Point',
                coordinates: [76.6400, 12.3000],
                name: 'NIE North Campus',
                isStop: true,
                distance: 13.0,
                morningTime: '08:55'
            }
        ],
        estimatedDuration: 60,
        schedule: [
            {
                departureTime: '07:55',
                arrivalTime: '08:55',
                days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
            }
        ]
    }
];

const sampleBuses = [
    {
        busNumber: 'BUS101',
        currentLocation: {
            type: 'Point',
            coordinates: [78.9629, 20.5937]
        },
        status: 'active',
        capacity: 40,
        currentOccupancy: 25
    },
    {
        busNumber: 'BUS102',
        currentLocation: {
            type: 'Point',
            coordinates: [78.9700, 20.5900]
        },
        status: 'active',
        capacity: 40,
        currentOccupancy: 30
    }
];

async function initializeData() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bus-tracking');
        console.log('Connected to MongoDB');

        // Clear existing data
        await Route.deleteMany({});
        await Bus.deleteMany({});
        console.log('Cleared existing data');

        // Insert routes
        const createdRoutes = await Route.insertMany(sampleRoutes);
        console.log('Created routes:', createdRoutes.map(r => r.name));

        // Assign routes to buses and insert buses
        const buses = sampleBuses.map((bus, index) => ({
            ...bus,
            route: createdRoutes[index % createdRoutes.length]._id  // Use modulo to cycle through routes
        }));
        const createdBuses = await Bus.insertMany(buses);
        console.log('Created buses:', createdBuses.map(b => b.busNumber));

        // Update routes with bus references
        for (const bus of createdBuses) {
            await Route.findByIdAndUpdate(bus.route, {
                $push: { buses: bus._id }
            });
        }

        console.log('Successfully initialized sample data');
        process.exit(0);
    } catch (error) {
        console.error('Error initializing data:', error);
        process.exit(1);
    }
}

initializeData();
