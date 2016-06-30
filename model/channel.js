module.exports = function(mongoose){

    var channelSchema = new mongoose.Schema({
        title: String
    });

    var Channel = mongoose.model("Channel",channelSchema);


}

