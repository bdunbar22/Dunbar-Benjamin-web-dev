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
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser
        };
        return api;

        /**
         * Adds the given user to the array. Assumes all necessary fields are filled.
         * @param user
         * @returns {null}
         */
        function createUser(user) {
            users.push(user);
            return null;
        }

        /**
         * Returns the user in local users array whose _ id matches the  userId parameter.
         * @param id
         * @returns user
         */
        function findUserById(userId) {
            for(var i in users) {
                if(users[i]._id === userId) {
                    return users[i];
                }
            }
            return null;
        }

        /**
         * returns the user in local u sers array whose  username matches the parameter  username.
         * @param username
         * @returns user
         */
        function findUserByUsername(username) {
            for(var i in users) {
                if(users[i].username === username) {
                    return users[i];
                }
            }
            return null;
        }

        /**
         * Returns the user whose u sername and  password match the  username and  password parameters.
         * @param username
         * @param password
         * @returns user
         */
        function findUserByCredentials(username, password) {
            for(var i in users) {
                if(users[i].username === username && users[i].password === password) {
                    return users[i];
                }
            }
            return null;
        }

        /**
         * Updates the user in local u sers array whose _ id matches the  userId parameter.
         * @param userId
         * @param user
         * @returns {boolean}
         */
        function updateUser(userId, user) {
            for(var i in users) {
                if(users[i]._id === userId) {
                    users[i].firstName = user.firstName;
                    users[i].lastName = user.lastName;
                    users[i].username = user.username;
                    users[i].email = user.email;
                    return true;
                }
            }
            return false;
        }

        /**
         * Remove a user from the user list if the _id matches the userId parameter.
         * @param userId
         * @returns boolean true a user was removed.
         */
        function deleteUser(userId) {
            var startLength = users.length;
            users.filter(checkId);

            //Items that pass this check will remain in the list.
            function checkId(user) {
                return user._id != userId;
            }

            return users.length < startLength;
        }
    }
})();