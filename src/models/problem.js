const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },


  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },

  ai: {
    summary: String,
    clarity: Number,
    uniqueness: Number,
    market: Number,
    category: String
  },

  upvotes: {
    type: Number,
    default: 0
  },
  votedIPs: {
    type: [String],
    default: []
  }

}, { timestamps: true });

module.exports = mongoose.model("Problem", problemSchema);