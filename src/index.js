const http = require("http");

const routes = require("./routes");

const server = http.createServer((req, res) => {
  const route = routes.find(
    (routerObj) =>
      routerObj.endpoint === req.url && routerObj.method === req.method
  );

  if (route) {
    route.handler(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end(`Cannot ${req.method} ${req.url}`);
  }
});

server.listen(3000, () =>
  console.log("🔥 Server started at http://localhost:3000")
);
