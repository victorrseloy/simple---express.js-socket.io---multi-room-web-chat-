module.exports = function (wrapper) {
    var mongoose = require("mongoose");
    var dbConnection =  mongoose.connect(process.env.MONGO_URL || "mongodb://localhost:27017/chat");
    var acl = wrapper.acl;
    mongoose.connection.on('open', function (ref) {
        console.log('Connected to mongo server.');
        console.log("Lets do this to " + dbConnection.connection.db)
        acl = new acl(new acl.mongodbBackend(dbConnection.connection.db, "acl_"));
        wrapper.acl = acl;
        require("./../middleware/aclMappings")(acl)
        
    });
    mongoose.connection.on('error', function (err) {
        console.log('Could not connect to mongo server!');
        console.log(err);
    });

    require("./channel")(mongoose);
    require("./message")(mongoose);
    require("./user")(mongoose);

}





