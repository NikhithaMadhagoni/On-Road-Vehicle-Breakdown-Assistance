const mongoose = require("mongoose")

const serviceprovider = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    business_name: { type: String, required: true },
    service_type: {
        type: String,
        enum: ['flat tire', 'battery jump-start', 'fuel delivery', 'towing', 'lockout assistance', 'vehicle diagnostics', 'other'],
        required: true
    },
    service_area: { type: String, required: true },
    contact: { type: Number, required: true },
    location: {
        lat: { type: Number, required: true },
        long: { type: Number, required: true }
    },
    is_available: { type: Boolean, required: true },
    rating: { type: Number, required: true, default: 0 },
    fee: { type: Number, required: true }
})

module.exports = mongoose.model("ServiceProvider", serviceprovider)