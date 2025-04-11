const express = require('express')
const router = express()
const userRoutes = require("../routes/userRoutes")
const serviceProviderRoutes = require("../routes/serviceProviderRoutes")
const requestRoutes = require("../routes/requestRoutes")
const { signin } = require('../controllers/userController')

router.use("/user", userRoutes)
router.use("/service", serviceProviderRoutes)
router.use("/request", requestRoutes)
router.post("/signin", signin)

module.exports = router;
