let libby = require("./bibby/index");

libby.encode("123")
.then(encoded => libby.compare('123',encoded))
.then(res => console.log(res))
.catch((err) => console.log(err));