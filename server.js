/***************** IMPORTS *******************/
var express = require("express");
var app = express();
var server = require('http').createServer(app);
var io = require("socket.io")(server);
var bodyParser = require("body-parser");
var acl = require("acl");
var mongoose = require("mongoose");
var session = require("express-session")

/***************** IMPORTS *******************/

/***************** SETUP *******************/
app.use(express.static(__dirname+"/public"));
app.use(bodyParser({"urlExtended":"true"}));
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(session({"secret":"shite"}));

//setup models
var wrapper = new Object();
wrapper.acl = acl;
require("./model/models")(wrapper);
/***************** SETUP *******************/

/***************** ROUTES *******************/
app.use("/js",express.static(__dirname+"/node_modules/bootstrap/dist/js"));
app.use("/js",express.static(__dirname+"/node_modules/jquery/dist"));
app.use("/js",express.static(__dirname+"/node_modules/angular"));
app.use("/css",express.static(__dirname+"/public/js"));
app.use("/css",express.static(__dirname+"/node_modules/angular"));
app.use("/css",express.static(__dirname+"/node_modules/bootstrap/dist/css"));
app.use("/css",express.static(__dirname+"/public/css"));
app.use("/fonts",express.static(__dirname+"/node_modules/bootstrap/dist/fonts"));
app.use("/img",express.static(__dirname+"/public/img"));
/***************** ROUTES *******************/




/*********************ACL********************/
//acl = new acl(new acl.mongodbBackend(mongoose.connection,"_acl"));
//acl = new acl(new acl.memoryBackend());
var aclValidation = require("./middleware/aclValidation")(wrapper);

/*********************ACL********************/


/***************** REGISTER CONTROLLERS *******************/
require("./controllers/channelController")(app,aclValidation);
require("./controllers/messageController")(app,aclValidation);
require("./controllers/userController")(app,aclValidation);
require("./controllers/loginController")(app,aclValidation);
require("./controllers/chatController")(io);
/***************** REGISTER CONTROLLERS *******************/

//catch all route
app.get("*",aclValidation.checkPermission("app","view"),function (req,res) {
    res.sendfile("./public/app.html")
});


/***************** START SERVER **************/
server.listen(5000);
/***************** START SERVER **************/


