const mongoose = require('mongoose');
const Route = require('./models/Route');

const staffRoute = {
    name: 'Staff Route',
    routeNumber: 'SR-1',
    description: 'NIE Staff Transportation Route',
    path: [
        {
            name: 'NIE South Campus',
            coordinates: [12.2838184, 76.6414748],
            isStop: true,
            morningTime: '8:00 AM'
        },
        // Add intermediate points for smoother route
        {
            coordinates: [12.2850, 76.6361],
            isStop: false
        },
        {
            name: 'Dr Agarwals Eye Hospital',
            coordinates: [12.2863179, 76.6308853],
            isStop: true,
            morningTime: '8:10 AM'
        },
        {
            coordinates: [12.2865, 76.6284],
            isStop: false
        },
        {
            name: 'Sri Shanthisagar Complex',
            coordinates: [12.286828, 76.6259848],
            isStop: true,
            morningTime: '8:15 AM'
        },
        {
            coordinates: [12.2870, 76.6217],
            isStop: false
        },
        {
            name: 'Andolana Circle',
            coordinates: [12.2873558, 76.6174957],
            isStop: true,
            morningTime: '8:20 AM'
        },
        {
            coordinates: [12.2866, 76.6150],
            isStop: false
        },
        {
            name: 'CESC KEB Office',
            coordinates: [12.2859004, 76.612665],
            isStop: true,
            morningTime: '8:25 AM'
        },
        {
            coordinates: [12.2937, 76.6089],
            isStop: false
        },
        {
            name: 'Bogadi 2nd Stage',
            coordinates: [12.301443, 76.6051666],
            isStop: true,
            morningTime: '8:35 AM'
        },
        {
            coordinates: [12.3213, 76.5945],
            isStop: false
        },
        {
            name: 'Hootagalli',
            coordinates: [12.3411354, 76.5839681],
            isStop: true,
            morningTime: '8:45 AM'
        },
        {
            coordinates: [12.3562, 76.5844],
            isStop: false
        },
        {
            name: 'NIE North Campus',
            coordinates: [12.371201, 76.5849104],
            isStop: true,
            morningTime: '9:00 AM'
        }
    ],
    estimatedDuration: 60
};

async function resetRoutes() {
    try {
        await mongoose.connect('mongodb://localhost:27017/busTracking', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // Clear existing routes
        await Route.deleteMany({});

        // Add staff route
        await Route.create(staffRoute);

        console.log('Routes reset successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error resetting routes:', error);
        process.exit(1);
    }
}

resetRoutes();
