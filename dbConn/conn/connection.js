const mongoose = require('mongoose')

mongoose.connect(`mongodb+srv://KonanDkin:CpAaHMCMG_02@cluster0.g6uny.mongodb.net/VideoGame?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
})

module.exports=mongoose