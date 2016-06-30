var mongoose = require("mongoose");

module.exports = function(app,acl){
    app.post("/user",function(req,res){
        var User = mongoose.model("User");
        User.create(req.body,function (err,usr) {
            acl.wrapper.acl.addUserRoles(usr._id.toString(),"registered");

            //TODO: check if json and return ok
            res.redirect("/login");

        });

    });
}
