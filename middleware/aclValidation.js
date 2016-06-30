module.exports = function (wrapper) {

    /*
     * checkPermission
     * checks if a user has permission to perform an action on a specified resource
     *
     *  @param {string} resource - resource being accessed
     *  @param {string/array} action - action(s) being performed on the resource
     *  @param {object} req - express request object
     *  @param {object} res - express response object
     *  @param {object} next - express middleware next object
     */

    var wrapperRef = wrapper;

    function aclValidation() {

        this.wrapper = wrapper;
        

        this.checkPermission = function (resource, action) {
            var middleware = false;  // start out assuming this is not a middleware call

            return function (req, res, next) {

                var aclRef = wrapperRef.acl;

                // check if this is a middleware call
                if (next) {
                    // only middleware calls would have the "next" argument
                    middleware = true;
                }


                var uid = 0;// get user id property from express request
                if (req.session && req.session.user && req.session.user._id) {
                    uid = req.session.user._id;
                }

                // perform permissions check
                aclRef.isAllowed(uid, resource, action, function (err, result) {
                    // return results in the appropriate way
                    switch (middleware) {
                        case true:
                            if (result) {
                                // user has access rights, proceed to allow access to the route
                                next();
                            } else {
                                res.redirect('/login.html');
                                // user access denied
                                //var checkError = new Error("user does not have permission to perform this action on this resource");
                                //next(checkError);  // stop access to route
                            }
                            return;
                            break;
                        case
                        false:

                            if (result) {
                                // user has access rights

                                return true;
                            } else {
                                // user access denied
                                return false;
                            }
                            break;
                    }
                });
            }
        }
    }

    return new aclValidation();

}
