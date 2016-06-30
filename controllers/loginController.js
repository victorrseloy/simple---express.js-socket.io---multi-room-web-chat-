var mongoose = require("mongoose");

module.exports = function(app,acl){
    app.post("/login",function(req,res){
        var User = mongoose.model("User");
        User.findOne({"name":req.body.name,"password":req.body.password},function (err,user) {
            if(user){
                req.session.id = user._id.toString();
                req.session.user = user;
                res.redirect("/");
            }
            else{
                res.redirect("/login.html");
            }
        })

    });
}
