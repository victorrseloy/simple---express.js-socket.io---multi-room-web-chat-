module.exports = function (mongoose) {
    var userSchema = mongoose.Schema({
        name:String,
        password:String
    });

    var User = mongoose.model("User",userSchema);
}