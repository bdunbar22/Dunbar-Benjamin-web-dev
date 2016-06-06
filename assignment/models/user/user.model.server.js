/**
 * Created by Ben on 6/6/16.
 */

module.exports = function () {
    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
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
        return User.findById(userId);
    }
    
    function findUserByUsername(username) {
        return User.find({username: username});
    }
    
    function findUserByCredentials(username, password) {
        return User.find({username: username, password: password});
    }
    
    function updateUser(userId,user) {
        return User.update({_id: userId}, {$set: {user}})
    }
    
    function deleteUser(userId) {
        return User.remove({_id: userId});
    }
};