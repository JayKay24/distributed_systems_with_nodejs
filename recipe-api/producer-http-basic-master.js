#!/usr/bin/env node

const server = require("fastify")();
const path = require("path");
const cluster = require("cluster");

if (cluster.isMaster) {
  console.log(`master pid=${process.pid}`);

  cluster.setupMaster({
    exec: path.join(__dirname, "producer-http-basic-master.js"),
  });

  cluster.fork();
  cluster.fork();
} else {
  const HOST = process.env.HOST || "127.0.0.1";
  const PORT = process.env.PORT || 4000;

  server.get("/recipes/:id", async (req, reply) => {
    console.log(`worker request pid=${process.pid}`);
    const id = Number(req.params.id);
    if (id !== 42) {
      reply.statusCode = 404;
      return { error: "not_found" };
    }

    return {
      producer_pid: process.pid,
      recipe: {
        id,
        name: "Chicken Tikka Masala",
        steps: "Throw it in a pot...",
      },
      ingredients: [
        { id: 1, name: "Chicken", quantity: "1 lb" },
        { id: 2, name: "Sauce", quantity: "2 cups" },
      ],
    };
  });

  server.listen(PORT, HOST, () => {
    console.log(`Producer running at http://${HOST}:${PORT}`);
  });
}

cluster
  .on("disconnect", (worker) => {
    console.log("disconnect", worker.id);
  })
  .on("exit", (worker, code, signal) => {
    console.log("exit", worker.id, code, signal);
    // uncomment next line to make workers difficult to kill
    cluster.fork()
  })
  .on("listening", (worker, { address, port }) => {
    console.log(`listening`, worker.id, `${address}:${port}`);
  });
