const express = require('express')
const router = express.Router()
const { signup, display, info } = require("../controllers/userController.js")

router.post("/signup", signup)
// router.post("/signin", signin)
router.post("/spDisplay", display)
router.get("/spInfo/:id", info)


module.exports = router;