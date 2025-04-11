const mongoose = require('mongoose')

const request = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    servicerId: { type: mongoose.Schema.Types.ObjectId, ref: "ServiceProvider", required: true },
    vehicleType: {
        type: Number,
        enum: [2, 4, 6], required: true,
    },
    userlocation: {
        lat: { type: Number, required: true },
        long: { type: Number, required: true }
    },
    servicerlocation: {
        lat: { type: Number, required: true },
        long: { type: Number, required: true }
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'declined', 'completed'],
        default: 'pending'
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Request', request)
