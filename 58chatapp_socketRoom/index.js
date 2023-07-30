require('dotenv').config();
const express = require("express");
const app = express();
const hogan =require('hogan-express');
const path= require('path');
const server =require('http').createServer(app);
const io=require('socket.io')(server);
//usehogan
app.engine('html',hogan);
app.set('view engine','html');

// middleware
app.use(express.static(path.join(__dirname)));

app.get('/',(req,res) =>{
    res.render('index');
});

let userMap = new Map();
let room1 ='public';
let room2 ='private';
// soket 
io.on('connection',(socket) =>{
    socket.on('login',data=>{
        socket.username =data;
        userMap.set(socket.username ,socket.id);
        if(data == 'w' || data == "x"){
            socket.join(room1);
            socket.userRoom =room1;
        }else{
            socket.join(room2);
            socket.userRoom =room2;

        }
        socket.emit('login-success',data);
    });
    socket.on('msg',data =>{
        io.in(socket.userRoom).emit('income-msg',socket.username + " : " + data)
        // socket.emit('income-msg',data)  
    })
})

server.listen(process.env.PORT,() => console.log(`Server is running ${process.env.PORT}`));