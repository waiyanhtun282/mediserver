let http =require("http");
let url = require("url");
let qs = require("querystring");
require('dotenv').config();

let responder = (req,res,params) =>{
    res.writeHead(200,{"Content-type":"text/html"});
    res.end(params);
}

let routes ={
    "GET":{
        '/':(req,res,params) =>{
            let filePath = __dirname + '/index.html';

            responder( req,res ,filePath);
        },
        '/index.html':(req,res,params) =>{
            let filePath = __dirname + '/index.html';

            responder( req,res ,filePath);
        },
        '/about.html':(req,res,params) =>{
            let filePath = __dirname + '/about.html';
            responder( req,res , filePath);

        }
    },
    "POST":{
        '/':(req,res,params ) =>{
            responder( req,res ,` <h1>POST Method path =/about </h1>${ params.query.name} ${params.query.age}`);

        },
        '/api/login':(req,res,params ) =>{
            let body='';
            req.on("data" , data =>{
             body +=data;
             if(body.length > 1024){
                res.writeHead(403 ,{"Content-type":"text/html"});
                res.end('<h1>File Size is too big</h1>');
             }
            });
            req.on("end" , () =>{
                let query =qs.parse(body);
                // console.log(body);
                console.log(`Email is ${query.email } ${query.password}`);

                res.end();
            })
          
        }
    },
    "NA":(req,res ,params) =>{
        res.writeHead(404);
        res.end(`<h2>Not Found Route</h2> ${ params.query.name} and ${params.query.age}`)
    }
}

const start = (req,res) =>{
    let reqMethod = req.method;
     let params = url.parse(req.url , true);
    //  console.log(params);
  let resolveRoutes=routes[reqMethod][params.pathname];
//   console.log(resolveRoutes)
if(resolveRoutes !=null && resolveRoutes != undefined){
    resolveRoutes(req,res ,params)

}else{
    routes["NA"](req,res,params)
}
  
     
}

let server = http.createServer(start);

server.listen(process.env.PORT,() => console.log(`Server is port 3000 is running${process.env.PORT}`)) 
