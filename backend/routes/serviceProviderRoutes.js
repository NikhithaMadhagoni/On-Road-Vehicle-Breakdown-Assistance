const express = require('express')
const router = express.Router()
const { servicersignup } = require("../controllers/serviceProviderController.js")


router.post("/signup", servicersignup)
// router.post("/signin", servicersignin)

module.exports = router;