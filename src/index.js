const http = require("http");
const { URL } = require("url");

const routes = require("./routes");

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(`http://localhost:3000${req.url}`);

  const route = routes.find(
    (routerObj) =>
      routerObj.endpoint === parsedUrl.pathname &&
      routerObj.method === req.method
  );

  if (route) {
    req.query = Object.fromEntries(parsedUrl.searchParams);

    route.handler(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end(`Cannot ${req.method} ${parsedUrl.pathname}`);
  }
});

server.listen(3000, () =>
  console.log("🔥 Server started at http://localhost:3000")
);
