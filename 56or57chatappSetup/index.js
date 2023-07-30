require('dotenv').config();
const express = require('express');
const app  =express();
const hogan = require('hogan-express');
const path =require('path');
const http =require('http');
const server = http.createServer(app);
const io =require('socket.io')(server);
// hogan use
app.engine('html',hogan);
app.set('view engine','html');

// middleware img
app.use(express.static(path.join(__dirname)));


app.get('/',(req,res) =>{
    res.render('index');
});

io.on('connection',(socket) =>{
    socket.on('login',data =>{
        socket.username=data;
        socket.emit('login-success'  ,data);
        // io.to(socket.id).emit('login-success'  ,data) send to specific-id =specific user
        // socket.broadcast.emit('login-success'  ,data); send to listener except sender


    });
    socket.on('msg',data =>{
        // console.log(data)
        io.emit('income-msg', socket.username+" : " +data);
    })
})

server.listen(process.env.PORT,() =>console.log(`Server is running ${process.env.PORT}`));