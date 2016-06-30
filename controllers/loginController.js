var mongoose = require("mongoose");
var path = require('path');


module.exports = function(app,acl){
    app.get("/login",function(req,res){

        res.sendFile(path.resolve('views/login.html'));
    })

    app.post("/login",function(req,res){
        var User = mongoose.model("User");
        User.findOne({"name":req.body.name,"password":req.body.password},function (err,user) {
            if(user){
                req.session.id = user._id.toString();
                req.session.user = user;
                res.redirect("/");
            }
            else{
                res.redirect("/login");
            }
        })

    });
}
