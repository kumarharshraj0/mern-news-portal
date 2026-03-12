require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const adminRoutes = require("./routes/admin");

const authRoutes = require("./routes/auth");
const newsRoutes = require("./routes/news"); 
const paymentRoutes = require("./routes/payment"); 
const cloudinary = require("cloudinary").v2;

// ✅ Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const helmet = require("helmet");
const hpp = require("hpp");
const rateLimit = require("express-rate-limit");
const errorMiddleware = require("./middleware/errorMiddleware");
const ApiError = require("./utils/ApiError");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Security Middlewares
app.use(helmet()); 
app.use(express.json({ limit: "10mb" })); 
app.use(hpp()); 
app.use(cookieParser());

// Trust first proxy (necessary for Render/Heroku/Vercel)
app.set("trust proxy", 1);

// Rate Limiting
const limiter = rateLimit({
  max: 1000,
  windowMs: 15 * 60 * 1000,
  message: "Too many requests from this IP, please try again in 15 minutes!"
});
app.use("/api", limiter);

// CORS
const allowedOrigins = [
  process.env.CLIENT_ORIGIN,
  process.env.ADMIN_DASHBOARD_ORIGIN,
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175"
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payment", paymentRoutes);

// 404 Handler
app.use((req, res, next) => {
  next(new ApiError(404, `Can't find ${req.originalUrl} on this server!`));
});

// ✅ Global Error Handling Middleware
app.use(errorMiddleware);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("🚀 Mongo connected");
    app.listen(PORT, () => console.log(`🌍 Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));

