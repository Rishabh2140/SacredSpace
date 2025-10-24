const mongoose = require("mongoose")
const LiveEvent = require("../models/Events")
const SacredSpace = require("../models/SacredSpace")

exports.list = async (req, res) => {
  try {
    const { space, isLive, upcoming = "true", page = 1, limit = 20 } = req.query
    const query = {}
    if (space) query.space = space
    if (isLive === "true") query.isLive = true
    if (upcoming === "true") query.startTime = { $gte: new Date(Date.now() - 15 * 60 * 1000) } // include near-future

    const skip = (Number(page) - 1) * Number(limit)
    const items = await LiveEvent.find(query)
      .populate("space", "name type location")
      .populate("createdBy", "fullName email")
      .sort({ startTime: 1 })
      .limit(Number(limit))
      .skip(skip)
    const total = await LiveEvent.countDocuments(query)

    res.json({
      success: true,
      data: items,
      pagination: { page: Number(page), total: Math.ceil(total / Number(limit)), totalRecords: total },
    })
  } catch (e) {
    res.status(500).json({ success: false, message: "Failed to list events", error: e.message })
  }
}

exports.getById = async (req, res) => {
  try {
    const ev = await LiveEvent.findById(req.params.id)
      .populate("space", "name type location")
      .populate("createdBy", "fullName email")
    if (!ev) return res.status(404).json({ success: false, message: "Event not found" })
    res.json({ success: true, data: ev })
  } catch (e) {
    res.status(500).json({ success: false, message: "Failed to get event", error: e.message })
  }
}

exports.create = async (req, res) => {
  try {
    const payload = { ...req.body, createdBy: req.user?.userId }
    const space = await SacredSpace.findById(payload.space)
    if (!space) return res.status(404).json({ success: false, message: "Space not found" })

    const ev = await LiveEvent.create(payload)

    // maintain backlinks
    await SacredSpace.findByIdAndUpdate(space._id, { $addToSet: { events: ev._id }, $inc: { eventsCount: 1 } })

    res.status(201).json({ success: true, data: ev })
  } catch (e) {
    res.status(400).json({ success: false, message: "Failed to create event", error: e.message })
  }
}

exports.update = async (req, res) => {
  try {
    const ev = await LiveEvent.findById(req.params.id)
    if (!ev) return res.status(404).json({ success: false, message: "Event not found" })

    const isOwner = String(ev.createdBy) === String(req.user?.userId)
    const isAdmin = req.user?.role === "admin"
    if (!(isOwner || isAdmin)) {
      return res.status(403).json({ success: false, message: "Not authorized to update this event" })
    }

    const updated = await LiveEvent.findByIdAndUpdate(ev._id, req.body, { new: true, runValidators: true })
    res.json({ success: true, data: updated })
  } catch (e) {
    res.status(400).json({ success: false, message: "Failed to update event", error: e.message })
  }
}

exports.toggleLive = async (req, res) => {
  try {
    const ev = await LiveEvent.findById(req.params.id)
    if (!ev) return res.status(404).json({ success: false, message: "Event not found" })

    const isOwner = String(ev.createdBy) === String(req.user?.userId)
    const isAdmin = req.user?.role === "admin"
    if (!(isOwner || isAdmin)) return res.status(403).json({ success: false, message: "Not authorized" })

    const { isLive, streamUrl } = req.body
    ev.isLive = Boolean(isLive)
    if (streamUrl != null) ev.streamUrl = streamUrl
    await ev.save()

    res.json({ success: true, data: ev })
  } catch (e) {
    res.status(400).json({ success: false, message: "Failed to toggle live", error: e.message })
  }
}

exports.getLive = async (req, res) => {
  try {
    const { space } = req.query
    const query = { isLive: true }
    if (space) query.space = space

    const items = await LiveEvent.find(query).populate("space", "name type").sort({ startTime: 1 })
    res.json({ success: true, data: items })
  } catch (e) {
    res.status(500).json({ success: false, message: "Failed to fetch live events", error: e.message })
  }
}
