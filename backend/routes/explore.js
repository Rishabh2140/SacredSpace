const express = require("express")
const controller = require("../controllers/exploreController")

const router = express.Router()

router.get("/feed", controller.feed)

module.exports = router
