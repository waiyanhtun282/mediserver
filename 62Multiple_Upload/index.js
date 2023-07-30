const express = require("express");
const app =express();
const multer =require("multer");

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './assets/uploads')
  },
  filename: function (req, file, cb) {
    cb(null,Date.now()+ "_" + file.originalname  )
  }
});
let upload =multer({storage:storage});
app.post('/multiupload',upload.array('image',12),(req,res,next) =>{
    // console.log(req.files);
    req.files.forEach((file) =>{
        console.log(file.filename);
    })
    res.send(req.files);

    
})

app.listen(3005,() => console.log("Server is port 3005 is running") );
