let help= require('./help/help');
exports.hello =(user) =>{
    return "Mr" + user + '.' + help.ending();
}