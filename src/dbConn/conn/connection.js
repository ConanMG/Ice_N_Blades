const mongoose = require('mongoose')

mongoose.connect(`mongodb+srv://KonanDkin:CpAaHMCMG_02@cluster0.g6uny.mongodb.net/VideoGame?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
})
var conn = mongoose.connection;
conn.on('connected', function() {
    console.log('database is connected successfully');
});
conn.on('disconnected',function(){
    console.log('database is disconnected successfully');
})
conn.on('error', console.error.bind(console, 'connection error:'));
module.exports = conn;

module.exports=mongoose