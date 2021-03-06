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
        findAllUsers: findAllUsers,
        search: search,
        findUserByFacebookId: findUserByFacebookId,
        findUserByGoogleId: findUserByGoogleId,
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

    function findAllUsers() {
        return User.find({},{password: 0, dateCreated: 0, dateUpdated: 0});
    }

    function search(searchText) {
        return User.find({$or: [
                            {'email': {$regex:searchText, $options:'i'}},
                            {'username': {$regex:searchText, $options:'i'}},
                            {'firstName': {$regex:searchText, $options:'i'}},
                            {'lastName': {$regex:searchText, $options:'i'}}]
                        }, {password: 0, dateCreated: 0, dateUpdated: 0});
    }

    function findUserByFacebookId(facebookId) {
        return User.findOne({'facebook.id': facebookId});
    }

    function findUserByGoogleId(googleId) {
        return User.findOne({'google.id': googleId});
    }

    function updateUser(userId, user) {
        return User.update({_id: userId}, {$set: user});
    }
    
    function deleteUser(userId) {
        return User.remove({_id: userId});
    }
};