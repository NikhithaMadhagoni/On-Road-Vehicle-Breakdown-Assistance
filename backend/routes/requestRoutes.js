const express = require('express')
const router = express.Router()
const { pending, accepted, declined, completed } = require('../controllers/requestController');

router.post("/requested", pending);
router.post("/accepted/:reqId", accepted)
router.post("/declined/:reqId", declined)
router.post("/completed/:reqId", completed)

module.exports = router;