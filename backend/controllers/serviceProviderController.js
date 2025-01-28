const ServiceProvider = require("../models/serviceprovidermodel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.servicersignup = async (req, res) => {
    const { name, email, password, business_name, service_type, service_area, contact, location, is_available, rating, fee } = req.body;

    if (!name || !email || !password || !business_name || !service_type || !service_area || !contact || !location || !is_available || !rating || !fee) {
        return res.status(400).json({ message: "All fields are required!" });
    }
    try {
        const existingUser = await ServiceProvider.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newServicer = await ServiceProvider.create({
            name,
            email,
            password: hashedPassword,
            business_name,
            service_type,
            service_area,
            contact,
            location: { lat: location.lat, long: location.long },
            is_available,
            rating,
            fee
        });
        const token = jwt.sign({ email }, "nikki")

        res.status(201).json({ message: "Registered Successfully!", newServicer, token });
    } catch (err) {
        console.error("Error during signup:", err);
        res.status(500).json({ message: "Internal Error!", error: err.message });
    }
};



exports.servicersignin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    try {
        const existingUser = await ServiceProvider.findOne({ email });
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
        console.error("Error during signup:", err);
        res.status(500).json({ message: "Internal Error!", error: err.message });
    }
};