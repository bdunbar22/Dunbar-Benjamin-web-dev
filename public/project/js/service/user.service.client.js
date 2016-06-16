/**
 * Created by Ben on 6/16/16.
 * Allows for API calls to the server to give CRUD operations.
 * Gives operations for the User services.
 */

(function () {
    angular
        .module("BenProject")
        .factory("UserService", UserService);

    function UserService($http) {
        var api = {
            createUser: createUser,
            register: register,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            login: login,
            updateUser: updateUser,
            deleteUser: deleteUser,
            checkLoggedIn: checkLoggedIn
        };
        return api;

        function createUser(user) {
            var url = "/project/api/user";
            return $http.post(url, user);
        }

        function register(username, password) {
            var url = "/project/api/register";
            var user = {
                username: username,
                password: password
            };
            return $http.post(url, user);
        }

        function findUserById(userId) {
            var url = "/project/api/user/" + userId;
            return $http.get(url);
        }

        function findUserByUsername(username) {
            var url = "/project/api/user/?username=" + username;
            return $http.get(url);
        }

        function findUserByCredentials(username, password) {
            var url = "/project/api/user/?username=" + username + "&password=" + password;
            return $http.get(url);
        }

        function login(username, password) {
            var url = "/project/api/login";
            var user = {
                username: username,
                password: password
            };
            return $http.post(url, user);
        }

        function updateUser(userId, user) {
            var url = "/project/api/user/" + userId;
            return $http.put(url, user);
        }

        function deleteUser(userId) {
            var url = "/project/api/user/" + userId;
            return $http.delete(url);
        }

        function checkLoggedIn() {
            var url = "/project/api/loggedin";
            return $http.get(url);
        }
    }
})();