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

let checkFileLists = (filepath) =>{
  return new Promise((resolve,rejects) =>{
    fs.access(filepath,fs.F_OK ,(err) =>{
      if(err) rejects(err)
      resolve(filepath);
    })
  })
};

let myReadFile = (filepath) =>{
  return new Promise((resolve,rejects) =>{
    fs.readFile(filepath,(err,data) =>{
      if(err) rejects(err)
      resolve(data)
    })
  })
}
let router = (req, res) => {
  let params = url.parse(req.url, true);
  let oripath = params.pathname == "/" ? "/index.html" : params.pathname;
  let filepath = __dirname + oripath;
  // console.log(filepath);
  let ext = path.extname(oripath);

  checkFileLists(filepath)
  .then(myReadFile)
  .then((data) =>{
  res.writeHead(200,{"Content-type":"text/html"});
  res.end(data);
  })
  .catch(err => {
    res.writeHead(404,{"Content-type":"text/html"});
    res.end("<h1>File Not Found</h1>")
  }
  );

  // console.log("Extension",ext);
  // fs.access(filepath, fs.F_OK, (err) => {
  //   if (err) {
  //     res.writeHead(404, { "Content-type": "text/html" });
  //     res.end("<h1>Not found route</h1>");
  //   } else {
    // );
    //       if (err) {
  //         res.writeHead(403, { "Content-type": "text/html" });
  //         res.end("<h1>File read Error</h1>");
  //       } else {
  //         res.writeHead(200, { "Content-type": meme[ext] });
  //         res.end(data);
  //       }
  //     });
  //   }
  // });
};

let server = http.createServer(router);

server.listen(process.env.PORT, () =>
  console.log(`Server is running  ${process.env.PORT}`)
);
