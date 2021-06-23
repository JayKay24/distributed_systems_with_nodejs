#!/usr/bin/env node

const server = require("fastify")();
const DatabaseReconnection = require("./db.js");
const db = new DatabaseReconnection({
  host: "localhost",
  port: 5432,
  user: "user",
  password: "hunter2",
  database: "dbconn",
  retry: 1_000,
});

db.connect();
db.on("error", (err) => console.error("db error", err.message));
db.on("reconnect", () => console.log("reconnecting..."));
db.on("connect", () => console.log("connected"));
db.on("disonnect", () => console.log("disconnected"));

server.get("/foo/:foo_id", async (req, reply) => {
  try {
    var res = await db.query("SELECT NOW() AS time, $1 AS echo", [
      req.params.foo_id,
    ]);
  } catch (error) {
    reply.statusCode = 503;
    return error;
  }
  return res.rows[0];
});

server.get("/health", async (req, res) => {
  if (!db.connected) {
    throw new Error("no db connection");
  }
  return "OK";
});

server.listen(3000, () => console.log("http://localhost:3000"));
