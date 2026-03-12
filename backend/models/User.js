const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ["user", "admin"], 
    default: "user" 
  },
  isPremium: {
    type: Boolean,
    default: false
  },
  subscriptionPlan: {
    type: String,
    enum: ["free", "monthly", "yearly"],
    default: "free"
  },
  subscriptionExpiresAt: {
    type: Date,
    default: null
  },
  bookmarks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "News"
  }]
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
