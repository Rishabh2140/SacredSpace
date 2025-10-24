const SacredSpace = require("../models/SacredSpace")

function buildGeoQuery(lat, lng, radiusKm) {
  if (lat == null || lng == null) return undefined
  return {
    "location.coordinates": {
      $near: {
        $geometry: { type: "Point", coordinates: [Number(lng), Number(lat)] },
        $maxDistance: Number(radiusKm || 10) * 1000,
      },
    },
  }
}

exports.list = async (req, res) => {
  try {
    const { type = "all", city = "all", isLive, lat, lng, radius = 10, limit = 50, page = 1, q } = req.query

    const query = {}

    if (type && type !== "all") query.type = type
    if (city && city !== "all") query["location.address"] = { $regex: city, $options: "i" }
    if (isLive === "true") query["liveStream.isLive"] = true
    if (q) {
      query.$or = [{ name: { $regex: q, $options: "i" } }, { description: { $regex: q, $options: "i" } }]
    }

    const geo = buildGeoQuery(lat, lng, radius)
    if (geo) Object.assign(query, geo)

    const skip = (Number(page) - 1) * Number(limit)

    const spaces = await SacredSpace.find(query)
      .populate("administrator", "fullName email")
      .populate("artists", "fullName email")
      .populate("pujaris", "fullName email")
      .limit(Number(limit))
      .skip(skip)
      .sort({ createdAt: -1 })

    const total = await SacredSpace.countDocuments(query)

    res.json({
      success: true,
      data: spaces,
      pagination: {
        current: Number(page),
        total: Math.ceil(total / Number(limit)),
        count: spaces.length,
        totalRecords: total,
      },
    })
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching spaces", error: error.message })
  }
}

exports.getById = async (req, res) => {
  try {
    const space = await SacredSpace.findById(req.params.id)
      .populate("administrator", "fullName email")
      .populate("artists", "fullName email")
      .populate("pujaris", "fullName email")

    if (!space) return res.status(404).json({ success: false, message: "Space not found" })

    await SacredSpace.findByIdAndUpdate(req.params.id, { $inc: { visitorsCount: 1 } })
    res.json({ success: true, data: space })
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching space", error: error.message })
  }
}

exports.create = async (req, res) => {
  try {
    const payload = { ...req.body }
    if (req.user?.role === "admin") payload.administrator = req.user.userId

    const space = await SacredSpace.create(payload)
    res.status(201).json({ success: true, message: "Space created successfully", data: space })
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating space", error: error.message })
  }
}

exports.update = async (req, res) => {
  try {
    const space = await SacredSpace.findById(req.params.id)
    if (!space) return res.status(404).json({ success: false, message: "Space not found" })

    const isAdmin = req.user?.role === "admin"
    const isAdministrator = String(space.administrator || "") === String(req.user?.userId)
    const isSamiti = Array.isArray(space.samiti) && space.samiti.some((id) => String(id) === String(req.user?.userId))

    if (!(isAdmin || isAdministrator || isSamiti)) {
      return res.status(403).json({ success: false, message: "Not authorized to update this space" })
    }

    const updated = await SacredSpace.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    res.json({ success: true, message: "Space updated successfully", data: updated })
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating space", error: error.message })
  }
}
