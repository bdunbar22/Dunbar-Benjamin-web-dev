/**
 * Created by Ben on 6/6/16.
 */

module.exports = function (projectDB) {
    var UserSchema = require("./user.schema.server")();
    var User = projectDB.model("User", UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        findAll: findAll,
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
        return User.findOne({username: username});
    }
    
    function findUserByCredentials(username, password) {
        return User.findOne({username: username, password: password});
    }

    function findAll() {
        return User.find();
    }
    
    function updateUser(userId, user) {
        return User.update({_id: userId}, {$set: user});
    }
    
    function deleteUser(userId) {
        return User.remove({_id: userId});
    }
};