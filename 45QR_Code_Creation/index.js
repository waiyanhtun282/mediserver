let fs =require("fs");
let qr = require('qr-image');
let encodedString = process.argv[2];
let outputImage =process.argv[3];

qr.image(encodedString,{type:'png' ,size:20}).pipe(fs.createWriteStream(outputImage));