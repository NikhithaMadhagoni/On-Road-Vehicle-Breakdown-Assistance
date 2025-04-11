const Request = require('../models/requestModel');
const User = require('../models/userModel');
const ServiceProvider = require('../models/serviceprovidermodel');

exports.pending = async (req, res) => {
    const { userId, servicerId, vehicle } = req.body;
    try {
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: "User does'nt exist!" });
        }
        const sp = await ServiceProvider.findById(servicerId)
        if (!sp) {
            return res.status(404).json({ message: "Service provider does'nt exist!" });
        }
        const request = new Request({
            userId: userId,
            servicerId: servicerId,
            vehicleType: vehicle,
            userlocation: user.location,
            servicerlocation: sp.location,
            status: "pending"
        });
        await request.save()
        return res.status(200).json({ message: "User requested service provider!" });
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};


exports.accepted = async (req, res) => {
    const { reqId } = req.params;
    try {
        const request = await Request.findById(reqId)
        if (!request) {
            return res.status(404).json({ message: "Request not found!" });
        }
        request.status = "accepted";
        await request.save()
        return res.status(200).json({ message: "Service provider accepted user request!", userlocation: request.userlocation });
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

exports.declined = async (req, res) => {
    const { reqId } = req.params;
    try {
        const request = await Request.findById(reqId)
        if (!request) {
            return res.status(404).json({ message: "Request not found!" });
        }
        request.status = "declined";
        await request.save()
        return res.status(200).json({ message: "Request declined!" });
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

exports.completed = async (req, res) => {
    const { reqId } = req.params;
    try {
        const request = await Request.findById(reqId)
        if (!request) {
            return res.status(404).json({ message: "Request not found!" });
        }
        request.status = "completed";
        await request.save()
        return res.status(200).json({ message: "Requested service is provided successfully!" });
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

