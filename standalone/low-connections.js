#!/usr/bin/env node

const http = require("http");

const server = http.createServer((req, res) => {
  // server.getConnections((err, count) => {
  //   if (err) {
  //     console.log(`Error: ${err}`);
  //   } else {
  //     console.log(`current conn ${count}`);
  //   }
  // });
  console.log(`current conn ${server._connections}`);
  setTimeout(() => res.end("OK"), 10000);
});

server.maxConnections = 2;
server.listen({ port: 3020, host: "localhost" });
