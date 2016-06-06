/**
 * Created by Ben on 6/6/16.
 */

module.exports = function () {
    var UserSchema = require("./widget.schema.server.js")()
    var User = mongoose.model("User", UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser
    };
    return api;

    function createUser(user) {
        return User.create(user);
    }
    
    function findUserById(userId) {
        
    }
    
    function findUserByUsername(username) {
        
    }
    
    function findUserByCredentials(username, password) {
        
    }
    
    function updateUser(userId,user) {
        
    }
    
    function deleteUser(userId) {
        
    }
};