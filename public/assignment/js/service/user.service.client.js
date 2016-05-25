/**
 * Created by Ben on 5/25/16.
 */

(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService() {
        var users =
            [
                {_id: "123", username: "alice",    password: "alice",    email: "", firstName: "Alice",  lastName: "Wonder"},
                {_id: "234", username: "bob",      password: "bob",      email: "", firstName: "Bob",    lastName: "Marley"},
                {_id: "345", username: "charly",   password: "charly",   email: "", firstName: "Charly", lastName: "Garcia"},
                {_id: "456", username: "jannunzi", password: "jannunzi", email: "", firstName: "Jose",   lastName: "Annunzi"}
            ];

        var api = {
            createUser: createUser,
            deleteUser: deleteUser,
            editUser: editUser,
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findUserById: findUserById
        };
        return api;

        function createUser() {
            //TODO: implement
            return null;
        }

        function deleteUser() {
            //TODO: implement
            return null;
        }

        function editUser(id, newUser) {
            for(var i in users) {
                if(users[i]._id === id) {
                    users[i].firstName = newUser.firstName;
                    users[i].lastName = newUser.lastName;
                    users[i].username = newUser.username;
                    users[i].email = newUser.email;
                    return true;
                }
            }
            return false;
        }

        function findUserByUsernameAndPassword(username, password) {
            for(var i in users) {
                if(users[i].username === username && users[i].password === password) {
                    return users[i];
                }
            }
            return null;
        }

        function findUserById(id) {
            for(var i in users) {
                if(users[i]._id === id) {
                    return users[i];
                }
            }
            return null;
        }
    }
})();