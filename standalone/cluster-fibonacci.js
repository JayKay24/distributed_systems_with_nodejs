#!/usr/bin/env node

const path = require("path");
const cluster = require("cluster");

if (cluster.isMaster) {
  // console.log(`master pid=${process.pid}`);

  cluster.setupMaster({
    exec: path.join(__dirname, "cluster-fibonacci.js"),
  });

  cluster.fork();
  cluster.fork();
} else {
  const server = require("fastify")();
  const HOST = process.env.HOST || "127.0.0.1";
  const PORT = process.env.PORT || 4000;

  const fibonacci = (limit) => {
    if (limit < 2) return limit;
    return fibonacci(limit - 1) + fibonacci(limit - 2);
  };

  const sleep = (ms) => {
    return new Promise((resolve, reject) => setTimeout(resolve, ms));
  };

  // console.log(`worker pid=${process.pid}`);

  server.get("/:limit", async (req, reply) => {
    await sleep(10);
    return String(fibonacci(Number(req.params.limit)));
  });

  server.listen(PORT, HOST, () => {
    // console.log(`Producer running at http://${HOST}:${PORT}`);
  });
}

cluster
  .on("disconnect", (worker) => {
    console.log("disconnect", worker.id);
  })
  .on("exit", (worker, code, signal) => {
    console.log("exit", worker.id, code, signal);
    // uncomment next line to make workers difficult to kill
    cluster.fork();
  })
  .on("listening", (worker, { address, port }) => {
    // console.log(`listening`, worker.id, `${address}:${port}`);
  });
