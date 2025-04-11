const User = require("../models/userModel.js");
const ServiceProvider = require("../models/serviceprovidermodel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const haversine = require("haversine-distance")

exports.signup = async (req, res) => {
    const { username, email, password, contact, vehicleType, location } = req.body;
    if (!username || !email || !password || !contact || !location) {
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
            vehicleType: "2",
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
        let user = await User.findOne({ email });
        let role = "user";

        if (!user) {
            user = await ServiceProvider.findOne({ email });
            role = "service_provider";
        }

        if (!user) {
            return res.status(400).json({ message: "Email does not exist" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Incorrect Password!" });
        }

        const token = jwt.sign({ email, role }, "nikki", { expiresIn: "1h" });

        res.status(200).json({
            message: "Logged in Successfully!",
            token,
            newUser: {
                _id: user._id,
                email: user.email,
                role,
                name: user.name,
            },
        });
    } catch (err) {
        res.status(500).json({ message: "Internal Error!", error: err.message });
    }
};
exports.display = async (req, res) => {
    try {
        const { userLat, userLng } = req.body; // Get user's location from request body

        // Validate user location
        if (typeof userLat !== "number" || typeof userLng !== "number") {
            return res.status(400).json({ message: "Invalid user location!" });
        }

        const serviceProviders = await ServiceProvider.find(); // Fetch all service providers

        if (!serviceProviders.length) {
            return res.status(404).json({ message: "No service providers found!" });
        }

        // Calculate distances and sort providers based on proximity
        const sortedProviders = serviceProviders
            .map((provider) => {
                if (
                    !provider.location || // Ensure location exists
                    typeof provider.location.lat !== "number" ||
                    typeof provider.location.long !== "number"
                ) {
                    console.log("Invalid provider location:", provider);
                    return { ...provider.toObject(), distance: Infinity }; // Skip invalid provider locations
                }

                const providerLocation = { latitude: provider.location.lat, longitude: provider.location.long };
                const userLocation = { latitude: userLat, longitude: userLng };

                const distance = haversine(userLocation, providerLocation) / 1000; // Convert to km

                return {
                    ...provider.toObject(),
                    distance: parseFloat(distance.toFixed(2)), // Round to 2 decimal places
                };
            })
            .filter(provider => provider.distance !== Infinity) // Remove invalid providers
            .sort((a, b) => a.distance - b.distance); // Sort by distance

        res.status(200).json({
            message: "Service providers fetched successfully!",
            serviceProviders: sortedProviders,
        });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ message: "Internal server error!", error: err.message });
    }
};


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