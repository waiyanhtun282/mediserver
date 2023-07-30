let http =require('http');
let url = require("url");
let  routes ={
    "GET":{
        '/':(req,res) =>{
            res.writeHead(200,{"Content-type":"text/html"});
            res.end("<h1>GET  Method => /</h1>")
         } ,
        "/home":(req,res) =>{
        res.writeHead(200,{"Content-type":"text/html"});
        res.end("<h2>GET  Method =>/home</h2>")
        }
    },
    "POST":{
        '/':(req,res) => {
            res.writeHead(200,{"Content-type":"text/html"});
            res.end("<h2>POST Method path =>/ </h2>");
        },
        "/about":(req,res) =>{
            res.writeHead(200,{"Content-type":"text/html"});
            res.end("<h2>POST Method path =>/about </h2>");
        }
    },
    "NA":(req,res)=>{
        res.writeHead(404);
        res.end("<h1>NOT FOUND ROUTE</h1>")
    }
}
const start = (req,res) =>{
let reqMethod =req.method;
let urlObj=url.parse(req.url,true);
// console.log(urlObj);
let resolveRoute= routes[reqMethod][urlObj.pathname];
if(resolveRoute != null && resolveRoute !=undefined){
    resolveRoute(req,res);
}else{
    routes['NA'](req,res)
}
}
let server =http.createServer(start);

server.listen(4000,() => console.log("server port is 4000 is running"));