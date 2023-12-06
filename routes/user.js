const express = require("express")
const router = express.Router()
const controller = require("../controllers/user")

// ENDPOINTS

router.post("/register", controller.register)

router.get("/login", controller.login)

module.exports = router