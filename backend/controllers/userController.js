const User = require("../models/userModel.js");
const ServiceProvider = require("../models/serviceprovidermodel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

exports.signup = async (req, res) => {
    const { username, email, password, contact, vehicleType, location } = req.body;

    if (!username || !email || !password || !contact || !vehicleType || !location) {
        return res.status(400).json({ message: "All fields are required!" });
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            contact,
            vehicleType,
            location: { lat: location.lat, long: location.long }
        });
        const token = jwt.sign({ email }, "nikki")

        res.status(201).json({ message: "Registered Successfully!", newUser, token });
    } catch (err) {
        console.error("Error during signup:", err);
        res.status(500).json({ message: "Internal Error!", error: err.message });
    }
};

exports.signin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(409).json({ message: "User does not exist" });
        }
        const hashedPassword = await bcrypt.compare(password, existingUser.password);
        if (!hashedPassword) {
            res.status(400).json({ message: "Incorrect Password!" })
        }
        const token = jwt.sign({ email }, "nikki")

        res.status(201).json({ message: "Logged in Successfully!", token });
    } catch (err) {
        res.status(500).json({ message: "Internal Error!", error: err.message });
    }
};

exports.display = async (req, res) => {
    try {
        const sp = await ServiceProvider.find();
        if (!sp) {
            res.status(404).json({ message: "No service provider found!" });
        }
        res.status(200).json({ message: "Service providers fetched successfully!", sp });
    }
    catch (err) {
        res.status(500).json({ messgae: "Internal server error!", error: err.message });
    }
}

exports.info = async (req, res) => {
    try {
        const { id } = req.params;
        const sp = await ServiceProvider.findById(id);
        if (!sp) {
            return res.status(404).json({ message: "Service Provider not found!" });
        }
        return res.status(200).json(sp);
    }
    catch (err) {
        res.status(500).json({ message: "Internal server error!", error: err.message });
    }
}