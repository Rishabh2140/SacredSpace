const Comment = require("../models/Comment")

exports.list = async (req, res) => {
  try {
    const { targetType, targetId } = req.params
    const { page = 1, limit = 20 } = req.query

    const query = { targetType, targetId }
    const comments = await Comment.find(query)
      .populate("user", "fullName email")
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))

    const total = await Comment.countDocuments(query)
    res.json({
      success: true,
      data: comments,
      pagination: { page: Number(page), total: Math.ceil(total / Number(limit)), totalRecords: total },
    })
  } catch (e) {
    res.status(500).json({ success: false, message: "Failed to list comments", error: e.message })
  }
}

exports.create = async (req, res) => {
  try {
    const { targetType, targetId, text, parent } = req.body
    const doc = await Comment.create({
      user: req.user.userId,
      targetType,
      targetId,
      text,
      parent: parent || undefined,
    })
    const populated = await doc.populate("user", "fullName email")
    res.status(201).json({ success: true, data: populated })
  } catch (e) {
    res.status(400).json({ success: false, message: "Failed to create comment", error: e.message })
  }
}

exports.remove = async (req, res) => {
  try {
    const { id } = req.params
    const c = await Comment.findById(id)
    if (!c) return res.status(404).json({ success: false, message: "Comment not found" })
    if (String(c.user) !== String(req.user.userId)) {
      return res.status(403).json({ success: false, message: "Not authorized to delete this comment" })
    }
    await Comment.findByIdAndDelete(id)
    res.json({ success: true, message: "Comment deleted" })
  } catch (e) {
    res.status(500).json({ success: false, message: "Failed to delete comment", error: e.message })
  }
}
