const User = require("../models/User")

exports.toggleSpace = async (req, res) => {
  try {
    const { spaceId, note } = req.body
    const user = await User.findById(req.user.userId)
    if (!user) return res.status(404).json({ success: false, message: "User not found" })
    const result = await user.toggleSpaceBookmark(spaceId, note)
    res.json({ success: true, ...result })
  } catch (e) {
    res.status(400).json({ success: false, message: "Failed to toggle space bookmark", error: e.message })
  }
}

exports.toggleEvent = async (req, res) => {
  try {
    const { eventId, note } = req.body
    const user = await User.findById(req.user.userId)
    if (!user) return res.status(404).json({ success: false, message: "User not found" })
    const result = await user.toggleEventBookmark(eventId, note)
    res.json({ success: true, ...result })
  } catch (e) {
    res.status(400).json({ success: false, message: "Failed to toggle event bookmark", error: e.message })
  }
}

exports.toggleLibrary = async (req, res) => {
  try {
    const { itemId, kind, note } = req.body
    const user = await User.findById(req.user.userId)
    if (!user) return res.status(404).json({ success: false, message: "User not found" })
    const result = await user.toggleLibraryBookmark(itemId, kind, note)
    res.json({ success: true, ...result })
  } catch (e) {
    res.status(400).json({ success: false, message: "Failed to toggle library bookmark", error: e.message })
  }
}

exports.myLibrary = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
    if (!user) return res.status(404).json({ success: false, message: "User not found" })
    const items = await user.getLibraryBookmarks()
    res.json({ success: true, data: items })
  } catch (e) {
    res.status(500).json({ success: false, message: "Failed to get library bookmarks", error: e.message })
  }
}

exports.mySpaces = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
    if (!user) return res.status(404).json({ success: false, message: "User not found" })
    const items = await user.getSpaceBookmarks()
    res.json({ success: true, data: items })
  } catch (e) {
    res.status(500).json({ success: false, message: "Failed to get space bookmarks", error: e.message })
  }
}

exports.myEvents = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
    if (!user) return res.status(404).json({ success: false, message: "User not found" })
    const items = await user.getEventBookmarks()
    res.json({ success: true, data: items })
  } catch (e) {
    res.status(500).json({ success: false, message: "Failed to get event bookmarks", error: e.message })
  }
}
