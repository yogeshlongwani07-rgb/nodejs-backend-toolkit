const http = require("http");

const server = http.createServer((req, res) => {
  const { method, url } = req;

  // Home route - GET
  if (url === "/" && method === "GET") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Welcome to Home Page",
      }),
    );
  }

  // About route - PUT
  else if (url === "/about" && method === "PUT") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "About page updated",
      }),
    );
  }

  // Profile route - PATCH
  else if (url === "/profile" && method === "PATCH") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Profile updated partially",
      }),
    );
  }

  // Route not found
  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        error: "Route not found",
      }),
    );
  }
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
