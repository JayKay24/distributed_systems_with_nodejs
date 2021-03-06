#!/usr/bin/env node

const { createGzip } = require("zlib");
const path = require("path");
const http = require("http");
const fs = require("fs");

http
  .createServer((request, response) => {
    const raw = fs.createReadStream(path.join(__dirname, "index.html"));
    const acceptEncoding = request.headers["accept-encoding"] || "";
    response.setHeader("Content-Type", "text/plain");
    // console.log(acceptEncoding);

    if (acceptEncoding.includes("gzip")) {
      // console.log("encoding with gzip");
      response.setHeader("Content-Encoding", "gzip");
      raw.pipe(createGzip()).pipe(response);
    } else {
      // console.log("no encoding");
      raw.pipe(response);
    }
  })
  .listen(process.env.PORT || 1337);
