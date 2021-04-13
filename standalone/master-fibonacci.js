#!/usr/bin/env node

const server = require("fastify")();
const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || 4000;

const fibonnaci = (limit) => {
  if (limit < 2) return limit;
  return fibonnaci(limit - 1) + fibonnaci(limit - 2);
};

console.log(`worker pid=${process.pid}`);

server.get("/:limit", async (req, reply) => {
  return String(fibonacci(Number(req.params.limit)));
});

server.listen(PORT, HOST, () => {
  console.log(`Producer running at http://${HOST}:${PORT}`);
});