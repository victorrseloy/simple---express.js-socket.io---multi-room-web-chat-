/***********IMPORT************/
var mongoose = require("mongoose");
/***********IMPORT************/

module.exports = function (app,acl) {
    app.get("/channel",acl.checkPermission("app","view"),function (req, res) {
        var Channel = mongoose.model("Channel");
        Channel.find({},function (err,channels) {
           res.json(channels);
        });
    });

    app.post("/channel",acl.checkPermission("app","view"), function (req,res) {
        var Channel = mongoose.model("Channel");
        Channel.create(req.body);
        res.sendStatus(200);
    })

    app.delete("/channel/:id",acl.checkPermission("app","view") ,function(req,res){
        var Channel = mongoose.model("Channel");
        Channel.findOne({"_id" : req.params.id},function (err,channel) {
            channel.remove();
            res.sendStatus(200);
        })
    });
    
}
