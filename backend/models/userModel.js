const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contact: { type: Number, required: true },
    vehicleType: {
        type: Number,
        enum: [2, 4, 6], required: true,
    },
    location: {
        lat: { type: Number, reuired: true },
        long: { type: Number, required: true }
    }
});

module.exports = mongoose.model('User', userSchema);