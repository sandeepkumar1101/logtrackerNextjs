import { fa, faker } from "@faker-js/faker";

const message = [
  "Connection timeout",
  "Database connection established",
  "Disk space low",
  "Failed to process request",
  "User logged in",
  "Server crash detected",
  "API response time high",
  "New user registered",
  "Invalid credentials",
  "Application started",
  "Memory usage above threshold",
  "Database connection lost",
  "Task completed successfully",
  "Network latency detected",
  "File not found",
  "API version updated",
  "Unusual activity detected",
  "Security breach detected",
  "Server maintenance in progress",
  "System update required",
  "Authentication failure",
  "User session expired",
  "Resource limit exceeded",
  "Unexpected server response",
  "Backup completed",
  "Database query slow",
  "Out of memory",
  "New feature added",
  "Unresponsive API",
  "Invalid input data",
  "Application shutdown",
  "Disk failure imminent",
  "Data corruption detected",
  "API rate limit exceeded",
  "High CPU usage",
  "Server not responding",
  "User preferences updated",
  "Server overload",
  "Missing required fields",
  "System rebooted",
  "Network congestion",
  "Permission denied",
  "Database backup in progress",
  "Service degradation",
  "Server unreachable",
  "Task scheduled",
  "API endpoint deprecated",
  "Unexpected error occurred",
  "Application update available",
];
// "traceId": "abc-xyz-123",
const generateDummyLog = () => {
  const levels = ["info", "warning", "error"];
  return {
    level: levels[Math.floor(Math.random() * levels.length)],
    message: message[Math.floor(Math.random() * message.length)],
    resourceId: `server-${faker.datatype.number()}`,
    timestamp: faker.date.future().toISOString(),
    traceId: `trace-${faker.datatype.number()}`,
    spanId: `span-${faker.datatype.number()}`,
    commit: faker.git.shortSha(),
    metadata: {
      parentResourceId: `server-${faker.datatype.number()}`,
    },
  };
};

const generateDummyLogs = (count) => {
  const logs = [];
  for (let i = 0; i < count; i++) {
    logs.push(generateDummyLog());
  }
  return logs;
};

// Generate 100 dummy logs
export default generateDummyLogs;
