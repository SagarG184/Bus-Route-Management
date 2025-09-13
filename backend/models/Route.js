const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    routeNumber: {
        type: String,
        required: true
    },
    description: String,
    path: [{
        name: String,
        coordinates: {
            type: [Number],
            required: true
        },
        isStop: {
            type: Boolean,
            default: true
        },
        morningTime: String
    }],
    estimatedDuration: Number,
    active: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

routeSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Route = mongoose.model('Route', routeSchema);
module.exports = Route;
