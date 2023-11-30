const http = require("http");
const { setTimeout, clearTimeout } = require("timers");

const host = "0.0.0.0";
const port = 8080;
const VERSION = process.env.VERSION || "";

const requestListener = function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.writeHead(200);
  res.end(`{"hello": "world"}`);
};

let timerId;

process.on("SIGINT", async () => {
  console.log("[SIGINT]");
  await exitWhenStopped(0);
});
process.on("SIGTERM", async () => {
  console.log("[SIGTERM]");
  await exitWhenStopped(0);
});
process.on("SIGHUP", async () => {
  console.log("[SIGHUP]");
  await exitWhenStopped(0);
});
process.on("uncaughtException", async (error) => {
  console.log("[uncaughtException] ", error);
  await exitWhenStopped(1);
});

if (VERSION.trim().length === 0) {
  console.log("Missing VERSION environment variable. Aborting…");
  timerId = setTimeout(() => exitWhenStopped(1), 5 * 1000);
  return;
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});

async function exitWhenStopped(exitCode) {
  clearTimeout(timerId);
  process.exit(exitCode);
}


