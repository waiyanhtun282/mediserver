let http = require("http");
let url = require("url");
let qs = require("querystring");
let fs =require("fs");
const { error } = require("console");
require("dotenv").config();
let port = process.env.PORT;

let responder = (req, res, params) => {
  res.writeHead(200, { "Content-type": "text/html" });
  res.end(params);
};
let myFileReader = (filePath,res) =>{
fs.access(filePath, fs.F_OK , (err) =>{
    if(err) {
    res.writeHead(404,{"Contetn-type":"text/html"});
    res.end('<h2>File is not access found</h2>');
    }else{

        fs.readFile(filePath, (err,data) =>{
            if(err) throw err;
            res.writeHead(200,{'Content-type':'text/html'});
            res.end(data);
    
        })
    };
});
}

let routes = {
  GET: {
    "/": (req, res) => {
      let filePath = __dirname + "/index.html"
      myFileReader(filePath,res);
     
    },
    "/index.html": (req, res) => {
      let filePath = __dirname + "/index.html";
      myFileReader(filePath,res);

    },
    "/about.html": (req, res) => {
      let filePath = __dirname + "/about.html";
      myFileReader(filePath,res);
      
    },
  },
  POST: {
    "/": (req, res) => {
      responder(
        req,
        res,
        `<h1>Post path => / </h1> ${params.query.name}  ${params.query.age}`
      );
    },
    "/api/login": (req, res, params) => {
      let body = "";
      req.on("data", (data) => {
        body += data;
        // console.log(body);

        // for formData image
        if (body.length > 1024) {
          res.writeHead(403, { "Content-type": "text/html" });
          res.end("<h1>File Size is too big</h1>");
        }
      });
      req.on("end", () => {
        let query = qs.parse(body); /* change urlUncode to clencode */
        console.log(`Email ${query.email}  Password ${query.password}`);
        res.end();
      });
    },
  },
  NA: (req, res, params) => {
    responder(
      req,
      res,
      `<h2>Not Found Route</h2>  ${params.query.name}  ${params.query.age}`
    );
  },
};

const start = (req, res) => {
  let reqMethod = req.method;
  let params = url.parse(req.url, true);
  // console.log(params);
  let resolveRoute = routes[reqMethod][params.pathname];
  if (resolveRoute != null && resolveRoute != undefined) {
    resolveRoute(req, res, params);
  } else {
    routes["NA"](req, res, params);
  }
  // console.log(routes)
};

let server = http.createServer(start);

server.listen(port, () => console.log(`Server is running ${port}`));
