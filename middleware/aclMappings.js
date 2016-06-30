module.exports = function(acl){
    acl.addUserRoles(0,"guest",function () {
        console.log("chamou");
    });
    acl.addUserRoles(1,"registered",function () {
        console.log("chamou 2");
    });
    acl.allow("guest","login","view");
    acl.allow("registered","app","view");
}