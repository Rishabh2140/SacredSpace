const express = require("express")
const auth = require("../middleware/auth")
const controller = require("../controllers/commentsController")

const router = express.Router()

router.get("/:targetType/:targetId", controller.list)
router.post("/", auth, controller.create)
router.delete("/:id", auth, controller.remove)

module.exports = router
