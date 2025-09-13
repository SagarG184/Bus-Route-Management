const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
    busNumber: {
        type: String,
        required: true,
        unique: true
    },
    currentLocation: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    route: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Route'
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'maintenance'],
        default: 'inactive'
    },
    capacity: {
        type: Number,
        required: true
    },
    currentOccupancy: {
        type: Number,
        default: 0
    },
    currentPathIndex: {
        type: Number,
        default: 0
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Create index for status queries
busSchema.index({ status: 1 });

// Add 2dsphere index for geospatial queries
busSchema.index({ currentLocation: '2dsphere' });

module.exports = mongoose.model('Bus', busSchema);
