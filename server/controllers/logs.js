// GET /logs: This route will be used to retrieve all logs.
// GET /logs?level={level}: This route will be used to retrieve logs with a specific level.
// GET /logs?message={message}: This route will be used to retrieve logs with a specific message.
// GET /logs?resourceId={resourceId}: This route will be used to retrieve logs with a specific resourceId.
// GET /logs?timestamp={timestamp}: This route will be used to retrieve logs with a specific timestamp.
// GET /logs?traceId={traceId}: This route will be used to retrieve logs with a specific traceId.
// GET /logs?spanId={spanId}: This route will be used to retrieve logs with a specific spanId.
// GET /logs?commit={commit}: This route will be used to retrieve logs with a specific commit.
// GET /logs?metadata.parentResourceId={parentResourceId}: This route will be used to retrieve logs with a specific parentResourceId in metadata

import { io, localLog as logs } from "../index.js";
import LogModel from "../models/logs.js";

export const postLogs = async (req, res) => {
  try {
    const {
      level,
      message,
      resourceId,
      timestamp,
      traceId,
      spanId,
      commit,
      metadata: { parentResourceId },
    } = req.body;
    const newLog = {
      level,
      message,
      resourceId,
      timestamp,
      traceId,
      spanId,
      commit,
      metadata: {
        parentResourceId,
      },
    };
    LogModel.create(newLog);
    io.emit("logUpdate", newLog);
    res.status(201).json("Created Successfully");
  } catch (error) {
    logs.generatelogs(error);
    res.status(500).json({ message: error.message });
  }
};

export const getLogs = async (req, res) => {
  const params = req.query;
  const query = {};
  if (params?.level) {
    query.level = {
      $regex: params.level,
      $options: "i",
    };
  }
  if (params?.message) {
    query.message = {
      $regex: params.message,
      $options: "i",
    };
  }
  if (params?.resourceId) {
    query.resourceId = {
      $regex: params.resourceId,
      $options: "i",
    };
  }
  if (params?.traceId) {
    query.traceId = {
      $regex: params.traceId,
      $options: "i",
    };
  }
  if (params?.spanId) {
    query.spanId = {
      $regex: params.spanId,
      $options: "i",
    };
  }
  if (params?.commit) {
    query.commit = {
      $regex: params.commit,
      $options: "i",
    };
  }
  if (params?.parentResourceId) {
    query["metadata.parentResourceId"] = {
      $regex: params.parentResourceId,
      $options: "i",
    };
  }
  // date range filter

  if (params?.from && params?.to) {
    query.timestamp = {
      $gte: params.from,
      $lte: params.to,
    };
  }
  let pageNumber = 1;
  let pageSize = 10;
  if (params.pageNumber && params.pageSize) {
    pageNumber = parseInt(params.pageNumber);
    pageSize = parseInt(params.pageSize);
  }
  const skip = (pageNumber - 1) * pageSize;
  const limit = pageSize;
  const totalPage = Math.ceil(
    (await LogModel.countDocuments(query)) / pageSize
  );
  const sortedBy = params.sortedBy || "level";
  const sortedOrder = params.order || "asc";
  const sort = {};
  sort[sortedBy] = sortedOrder;
  const findData = await LogModel.find(query)
    .sort(sort)
    .skip(skip)
    .limit(limit);

  return res.status(200).json({
    data: findData,
    length: findData.length,
    totalPage: totalPage,
  });
};

export const getTotalLogCount = async (req, res) => {
  try {
    const count = await LogModel.countDocuments();
    res.status(200).json(count);
  } catch (error) {
    logs.generatelogs(error);
    res.status(500).json({ message: error.message });
  }
};

export const latestLogs = async (req, res) => {
  // latest 5 logs
  try {
    const { limit } = req.query;
    // sort by latest _id
    const findData = await LogModel.find()
      .sort({ _id: -1 })
      .limit(parseInt(limit));

    return res.status(200).json({
      data: findData,
      length: findData.length,
    });
  } catch (error) {
    logs.generatelogs(error);
    res.status(500).json({ message: error.message });
  }
};

export const fullSearch = async (req, res) => {};
