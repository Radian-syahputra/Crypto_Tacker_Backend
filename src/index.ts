import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db";

// Route
import authRoute from './modules/auth/route'
import cryptoRoute from './modules/crypto/route'

const app = express();
const PORT = process.env.PORT || 3000;

// Global Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoute);
app.use('/api/crypto', cryptoRoute)

app.get("/", (_, res) => {
  res.send("API Backend Berjalan");
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server Berjalan Di http://localhost:${PORT}`);
  });
});
