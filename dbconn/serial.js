#!/usr/bin/env node

const { Client } = require("pg");
const db = new Client({
  host: "localhost",
  user: "user",
  port: 5432,
  password: "hunter2",
  database: "dbconn",
});
db.connect();
(async () => {
  const start = Date.now();
  await Promise.all([
    db.query("SELECT pg_sleep(2)"),
    db.query("SELECT pg_sleep(2)"),
  ]);
  console.log(`took ${(Date.now() - start) / 1000} seconds`);
  db.end();
})();
