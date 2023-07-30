let http = require("http");
let url = require("url");
let path = require("path");
let fs = require("fs");

require("dotenv").config();
meme = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/js",
  ".png": "text/png",
  ".jpeg": "text/jpeg",
  ".gif": "text/gif",
};
let router = (req, res) => {
  let params = url.parse(req.url, true);
  let oripath = params.pathname == "/" ? "/index.html" : params.pathname;
  let filepath = __dirname + oripath;
//   console.log(filepath);
  let ext = path.extname(oripath);
  // console.log("Extension",ext);
  fs.access(filepath, fs.F_OK, (err) => {
    if (err) {
      res.writeHead(404, { "Content-type": "text/html" });
      res.end("<h1>Not found route</h1>");
    } else {
      fs.readFile(filepath, (err, data) => {
        if (err) {
          res.writeHead(403, { "Content-type": "text/html" });
          res.end("<h1>File read Error</h1>");
        } else {
          res.writeHead(200, { "Content-type": meme[ext] });
          res.end(data);
        }
      });
    }
  });
};

let server = http.createServer(router);

server.listen(process.env.PORT, () =>
  console.log(`Server is running  ${process.env.PORT}`)
);
