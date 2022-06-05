const fs = require("fs");
const http = require("http");
const path = require("path");
const url = require("url");

http.createServer((request, response) => {
  const pathname = request.url == "/" ? "/index.html" : path.normalize("/" + url.parse(request.url).pathname);

  fs.readFile(path.join("out", pathname), (error, data) => {
    if (error) {
      response.setHeader("Content-Type", "application/json");
      response.writeHead(404);
      response.end(JSON.stringify(error));
    } else {
      response.setHeader("Content-Type", {
        ".css": "text/css",
        ".html": "text/html",
        ".ico": "image/vnd.microsoft.icon",
        ".js": "text/javascript",
        ".vfuel": "application/octet-stream",
        ".wasm": "application/wasm",
        ".webp": "image/webp",
      }[path.parse(pathname).ext]);
      response.writeHead(200);
      response.end(data);
    }
  });
}).listen(8080, "127.0.0.1");
