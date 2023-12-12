import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import logRoutes from "./routes/log.js";
import Logs from "./logManager.js";
import { createServer } from "http";
import fs from "fs";
import { Server } from "socket.io";
import generateDummyLogs from "./data/injector.js";
import LogModel from "./models/logs.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan("common"));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
const server = createServer(app);
export const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL, // Adjust this to your frontend's origin
    methods: ["GET", "POST"],
  },
});

const PORT = 3000;

app.use("/api/v1/logs", logRoutes);
app.get("/dummy", async (req, res) => {
  const logs = generateDummyLogs(2000);
  await LogModel.insertMany(logs);
  res.send("Dummy logs generated");
});

export const localLog = new Logs();
localLog.on("logstracker", (log) => {
  const date = new Date();
  const messageLog = `${date.toISOString()} ${log} \n`;
  fs.appendFile(
    `./logs/${date.getFullYear()}-${date.getMonth()}-${date.getDate()}.log`,
    messageLog,
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
});

mongoose
  .connect(process.env.MONGO_URL, {
    // database <cluster0>
    dbName: "logProccessing",
  })
  .then(() => {
    server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));

// Socket.io connection event
io.on("connection", (socket) => {
  console.log("A user connected");

  // Optionally, you can handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
