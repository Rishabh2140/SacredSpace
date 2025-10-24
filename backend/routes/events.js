const express = require("express")
const auth = require("../middleware/auth")
const controller = require("../controllers/eventsController")

const router = express.Router()

router.get("/", controller.list)
router.get("/live", controller.getLive)
router.get("/:id", controller.getById)
router.post("/", auth, controller.create)
router.put("/:id", auth, controller.update)
router.put("/:id/live", auth, controller.toggleLive)

module.exports = router
