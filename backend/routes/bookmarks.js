const express = require("express")
const auth = require("../middleware/auth")
const controller = require("../controllers/bookmarksController")

const router = express.Router()

router.get("/library", auth, controller.myLibrary)
router.get("/spaces", auth, controller.mySpaces)
router.get("/events", auth, controller.myEvents)

router.post("/library/toggle", auth, controller.toggleLibrary)
router.post("/spaces/toggle", auth, controller.toggleSpace)
router.post("/events/toggle", auth, controller.toggleEvent)

module.exports = router
