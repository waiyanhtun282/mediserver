let bcrypt =require("bcrypt");
let encode = (palinpass) =>{
    return new Promise ((resolve,reject) =>{
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(palinpass, salt, function(err, hash) {
                // Store hash in your password DB.
                if(err) reject(err)
                resolve(hash)
            });
        });
    })
};

let compare = (palinpass,haspass) =>{
return new Promise((resolve,reject) =>{
    bcrypt.compare(palinpass, haspass, function(err, bool) {
       if(err) reject(err)
       resolve(bool)
    });
})

}

module.exports  = {
    encode,
    compare
}