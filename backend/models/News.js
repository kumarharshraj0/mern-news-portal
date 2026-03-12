const mongoose = require("mongoose");
const slugify = require("slugify");

const NewsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    excerpt: { type: String },
    category: { type: String },
    tags: [String],
     media: { type: String }, // Cloudinary URL or local path
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["draft", "published", "archived"], default: "draft" },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// ✅ Pre-save hook to auto-generate slug from title
NewsSchema.pre("validate", function (next) {
  if (this.title && !this.slug) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true, // remove special chars
    });
  }
  next();
});

module.exports = mongoose.model("News", NewsSchema);


