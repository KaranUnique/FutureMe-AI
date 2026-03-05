const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const apiRoutes = require("./src/routes/api");

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    // In production, restrict to specific domains
    if (process.env.NODE_ENV === "production") {
      const allowedOrigins = [
        "https://your-frontend-domain.vercel.app",
        "https://your-frontend-domain.netlify.app",
        // Add your production frontend URL here
      ];
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error("CORS policy violation"), false);
      }
    }

    // In development, allow all origins
    return callback(null, true);
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api", apiRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Trigger nodemon restart
