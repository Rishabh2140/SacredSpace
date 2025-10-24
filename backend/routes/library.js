const express = require("express")
const auth = require("../middleware/auth")
const controller = require("../controllers/libraryController")

const router = express.Router()

// Sacred Texts
router.get("/texts", controller.listTexts)
router.post("/texts", auth, controller.createText)
router.get("/texts/:id", controller.getText)
router.put("/texts/:id", auth, controller.updateText)
router.delete("/texts/:id", auth, controller.deleteText)

// Library Media
router.get("/media", controller.listMedia)
router.post("/media", auth, controller.createMedia)
router.get("/media/:id", controller.getMedia)
router.put("/media/:id", auth, controller.updateMedia)
router.delete("/media/:id", auth, controller.deleteMedia)

module.exports = router
