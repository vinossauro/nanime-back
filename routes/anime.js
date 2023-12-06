const express = require('express')
const router = express.Router()
const controller = require("../controllers/anime")

// ENDPOINTS:

router.get("/all", controller.get_all_animes)

router.get("/search/:name", controller.search_anime)

router.get("/populate", controller.populate_anime)

router.get("/get/:id", controller.get_anime)

// router.post("/update/:id", controller.update)

// router.post("/delete/:id", controller.del)

module.exports = router