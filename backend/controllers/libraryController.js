const SacredText = require("../models/SacredText")
const LibraryMedia = require("../models/LibraryMedia")

function buildQueryFromParams(qs, allowed = []) {
  const query = {}
  allowed.forEach((k) => {
    if (qs[k] != null && qs[k] !== "" && qs[k] !== "all") query[k] = qs[k]
  })
  if (qs.search) {
    query.$text = { $search: qs.search }
  }
  if (qs.space) query.space = qs.space
  return query
}

exports.listTexts = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query
    const query = buildQueryFromParams(req.query, ["language"])
    const docs = await SacredText.find(query)
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .lean()
    const total = await SacredText.countDocuments(query)
    res.json({ success: true, data: docs, pagination: { page: Number(page), limit: Number(limit), total } })
  } catch (e) {
    res.status(500).json({ success: false, message: "Failed to list texts", error: e.message })
  }
}

exports.createText = async (req, res) => {
  try {
    const payload = { ...req.body, uploader: req.user?.userId }

    if (!payload.fileUrl) {
      return res.status(400).json({ success: false, message: "fileUrl (PDF) is required" })
    }
    // Default and enforce mimeType
    if (!payload.mimeType) payload.mimeType = "application/pdf"
    if (payload.mimeType !== "application/pdf") {
      return res.status(400).json({ success: false, message: "mimeType must be application/pdf for SacredText" })
    }

    // Gentle check for extension if provided
    const url = String(payload.fileUrl).toLowerCase()
    if (!url.endsWith(".pdf")) {
      // Allow if a storage URL without .pdf suffix as long as mimeType is correct
      // No-op, we only warn via logs in real environments
    }

    const doc = await SacredText.create(payload)
    res.status(201).json({ success: true, data: doc })
  } catch (e) {
    res.status(400).json({ success: false, message: "Failed to create text", error: e.message })
  }
}

exports.getText = async (req, res) => {
  try {
    const doc = await SacredText.findById(req.params.id).lean()
    if (!doc) return res.status(404).json({ success: false, message: "Text not found" })
    res.json({ success: true, data: doc })
  } catch (e) {
    res.status(500).json({ success: false, message: "Failed to get text", error: e.message })
  }
}

exports.updateText = async (req, res) => {
  try {
    const update = { ...req.body }

    if (update.mimeType && update.mimeType !== "application/pdf") {
      return res.status(400).json({ success: false, message: "mimeType must be application/pdf for SacredText" })
    }
    if (update.fileUrl) {
      const url = String(update.fileUrl).toLowerCase()
      if (!url.endsWith(".pdf") && update.mimeType !== "application/pdf") {
        return res
          .status(400)
          .json({ success: false, message: "fileUrl should end with .pdf or mimeType must be application/pdf" })
      }
    }

    const doc = await SacredText.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true })
    if (!doc) return res.status(404).json({ success: false, message: "Text not found" })
    res.json({ success: true, data: doc })
  } catch (e) {
    res.status(400).json({ success: false, message: "Failed to update text", error: e.message })
  }
}

exports.deleteText = async (req, res) => {
  try {
    const doc = await SacredText.findByIdAndDelete(req.params.id)
    if (!doc) return res.status(404).json({ success: false, message: "Text not found" })
    res.json({ success: true, message: "Text deleted" })
  } catch (e) {
    res.status(500).json({ success: false, message: "Failed to delete text", error: e.message })
  }
}

// Media
exports.listMedia = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query
    const query = buildQueryFromParams(req.query, ["type", "language"])
    const docs = await LibraryMedia.find(query)
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .lean()
    const total = await LibraryMedia.countDocuments(query)
    res.json({ success: true, data: docs, pagination: { page: Number(page), limit: Number(limit), total } })
  } catch (e) {
    res.status(500).json({ success: false, message: "Failed to list media", error: e.message })
  }
}

exports.createMedia = async (req, res) => {
  try {
    const payload = { ...req.body, uploader: req.user?.userId }
    const doc = await LibraryMedia.create(payload)
    res.status(201).json({ success: true, data: doc })
  } catch (e) {
    res.status(400).json({ success: false, message: "Failed to create media", error: e.message })
  }
}

exports.getMedia = async (req, res) => {
  try {
    const doc = await LibraryMedia.findById(req.params.id).lean()
    if (!doc) return res.status(404).json({ success: false, message: "Media not found" })
    res.json({ success: true, data: doc })
  } catch (e) {
    res.status(500).json({ success: false, message: "Failed to get media", error: e.message })
  }
}

exports.updateMedia = async (req, res) => {
  try {
    const doc = await LibraryMedia.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!doc) return res.status(404).json({ success: false, message: "Media not found" })
    res.json({ success: true, data: doc })
  } catch (e) {
    res.status(400).json({ success: false, message: "Failed to update media", error: e.message })
  }
}

exports.deleteMedia = async (req, res) => {
  try {
    const doc = await LibraryMedia.findByIdAndDelete(req.params.id)
    if (!doc) return res.status(404).json({ success: false, message: "Media not found" })
    res.json({ success: true, message: "Media deleted" })
  } catch (e) {
    res.status(500).json({ success: false, message: "Failed to delete media", error: e.message })
  }
}
