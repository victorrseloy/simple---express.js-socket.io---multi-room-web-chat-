/***********IMPORT************/
var mongoose = require("mongoose");
/***********IMPORT************/

module.exports = function(app,acl){
    app.get("/message/:channel",function(req,res){
        var Message = mongoose.model("Message");
        Message.find({"channelId":req.params.channel},function(err,messages){
            res.json(messages);
        });
    });
}