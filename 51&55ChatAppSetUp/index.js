require('dotenv').config();
const express = require('express');
const app = express();
const hogan = require('hogan-express');
const path = require('path');
const server = require('http').createServer(app); // Attach the HTTP server to Express app
const io = require('socket.io')(server);

// website
app.engine('html',hogan);
app.set('view engine','html');
// middleware
app.use(express.static(path.join(__dirname)));




app.get('/' ,(req,res) =>{
    res.render("index");
})

// socket
io.on("connection" ,(socket) =>{
    socket.on("login", data =>{
        // console.log(socket.id);
        socket.username=data;
        io.to(socket.id).emit("login-success",true);
        // io.emit("login-success", 'from server' + data)
    });
    socket.on('msg',data =>{
        io.emit("income-msg" , socket.username + ":"+ data)
    })
})



server.listen(process.env.PORT,() => console.log(`Server is running ${process.env.PORT}`));