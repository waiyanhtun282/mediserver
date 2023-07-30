let http =require("http");
let url = require("url");
let qs = require("querystring");
require('dotenv').config();
let responder =(req,res,params) =>{
    res.writeHead(200,{"Content-type":"text/html"});
    res.end(params);
}
let routes ={
    "GET":{
        '/':(req,res) =>{
            responder(req,res,`<h1>Get Method path => /</h1>${params.query.name} and ${params.query.age}`)
        },
        '/contact':(req,res) =>{
            responder(req,res,`<h1>Get Method path => /contact</h1>${params.query.name} and ${params.query.age}`)
        }
    },
    "POST":{
        '/':(req,res) =>{
            responder(req,res,`<h1>POST Method path => /</h1>${params.query.name} and ${params.query.age}`)
            
        },
        "/api/login":(req,res) =>{
           let body="";
          req.on("data",data =>{
            body +=data;
          });
          req.on("end", () =>{
            // console.log(body);
            let query =qs.parse(body);
            console.log("Email",query.email,"Password",query.password);
            res.end();
          })
          
        }
    },
    "NA":(req,res) =>{
        res.writeHead(404);
        res.end(`<h2>Not Found Routw!</h2>${params.query.name} and ${params.query.age}`)
    }
};

const start = (req,res) =>{
let reqMethod = req.method;
 let params = url.parse(req.url, true);
 let resolveRoute =routes[reqMethod][params.pathname];
 if(resolveRoute != null  && resolveRoute !=undefined){
    resolveRoute(req,res,params);
 }else{
    routes["NA"](req,res,params);
 }
 
}

let server =http.createServer(start);

server.listen(process.env.PORT,() => console.log(`Server is port 3000 is running${process.env.PORT}`)) 
