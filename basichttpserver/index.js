const http = require("http");
const port = 8000;
const fs = require("fs");

function requestHandler(req, res) {
  console.log(req.url);
  let pageName = "index.html";
  switch (req.url) {
    case "/":
      pageName = "index.html";
      break;
    case "/index.html":
      pageName = "index.html";
      break;
    case "/profile.html":
      pageName = "profile.html";
      break;
    case "/contact.html":
      pageName = "contact.html";
      break;
    default:
      pageName = "404.html";
  }
  res.writeHead(200, { "content-type": "text/html" });
  fs.readFile(pageName, function (err, data) {
    if (err) {
      console.log("Error", err);
      return res.end("<h1>Error</h1>");
    }
    return res.end(data);
  });
}

const server = http.createServer(requestHandler);

server.listen(port, function (err) {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Server is running on port: ", port);
});
