let http =require('http');
let url = require("url");
require('dotenv').config();
let  routes ={
    "GET":{
        '/':(req,res,params) =>{
            res.writeHead(200,{"Content-type":"text/html"});
            res.end(`<h1>GET  Method => /</h1>${params.query.name}  and ${params.query.age}`)
         } ,
        "/home":(req,res,params) =>{
        res.writeHead(200,{"Content-type":"text/html"});
        res.end(`<h1>GET  Method => /contact</h1>${params.query.name}  and ${params.query.age}`)
        }
    },
    "POST":{
        '/':(req,res,params) => {
            res.writeHead(200,{"Content-type":"text/html"});
            res.end(`<h1>POST  Method => /</h1>${params.query.name}  and ${params.query.age}`);
        },
        "/about":(req,res,params) =>{
            res.writeHead(200,{"Content-type":"text/html"});
            res.end(`<h1>POST  Method => /about</h1>${params.query.name}  and ${params.query.age}`);
        },
    },
    "NA":(req,res,params)=>{
        res.writeHead(404);
        res.end(`<h1>NOT FOUND ROUTE</h1> ${params.query.name}  and ${params.query.age}`)
    }
}
const start = (req,res) =>{
let reqMethod =req.method;
let params=url.parse(req.url,true);
// console.log(params.query.name,params.query.age);
let resolveRoute= routes[reqMethod][params.pathname];
if(resolveRoute != null && resolveRoute !=undefined){
    resolveRoute(req,res,params);
}else{
    routes['NA'](req,res,params)
}
}
let server =http.createServer(start);

server.listen(process.env.PORT,() => console.log(`server port is 4000 is running${process.env.PORT}`));