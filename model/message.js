module.exports = function(mongoose){
    var messageSchema = mongoose.Schema({
        message:String,
        channelId:String,
        author:String
    });

    var Message = mongoose.model("Message",messageSchema);
}