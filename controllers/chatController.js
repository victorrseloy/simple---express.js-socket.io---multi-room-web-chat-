/***********IMPORT************/
var mongoose = require("mongoose");
/***********IMPORT************/

module.exports = function(io){
    io.on("connect",function (client) {
        client.on("join",function (data) {
            client.join(data.channelId);
            client.emit("messages","hello from server")
        });

        client.on("leave",function(data){
            client.leave(data.channelId);
        });

        client.on("message",function(data){
            var Message = mongoose.model("Message");
            Message.create({"message":data.message,"channelId":data.channelId,"author":data.author});
            io.sockets.in(data.channelId).emit("message",{"message":data.message,"author":data.author});
        });
    })
}