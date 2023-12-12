import express from "express";
import {
  postLogs,
  getLogs,
  fullSearch,
  latestLogs,
  getTotalLogCount,
} from "../controllers/logs.js";
const router = express.Router();

// 1.Logs ingestor endpoint
router.post("/", postLogs);

// 2. Query Interface

router.get("/filter", getLogs);

router.get("/search", fullSearch);

router.get("/totalLogs", getTotalLogCount);

router.get("/latestLogs", latestLogs);

export default router;
