const SacredSpace = require("../models/SacredSpace")
const LiveEvent = require("../models/Events")

exports.feed = async (req, res) => {
  try {
    const { q, limit = 12 } = req.query
    const spaceQuery = {}
    if (q) {
      spaceQuery.$or = [{ name: { $regex: q, $options: "i" } }, { description: { $regex: q, $options: "i" } }]
    }

    const [popularSpaces, liveNow] = await Promise.all([
      SacredSpace.find(spaceQuery).sort({ visitorsCount: -1, ratingAvg: -1 }).limit(Number(limit)),
      LiveEvent.find({ isLive: true }).populate("space", "name type").sort({ startTime: 1 }).limit(Number(limit)),
    ])

    res.json({ success: true, data: { spaces: popularSpaces, live: liveNow } })
  } catch (e) {
    res.status(500).json({ success: false, message: "Failed to load explore feed", error: e.message })
  }
}
