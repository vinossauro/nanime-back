const express = require('express')
const router = express.Router()
const controller = require("../controllers/userList")

// ENDPOINTS:

router.get("/create", controller.get_all_animes)

router.get("/update/:id", controller.search_anime)

router.get("/delete/:id", controller.populate_anime)

module.exports = router