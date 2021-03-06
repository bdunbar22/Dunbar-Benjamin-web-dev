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
            findAllUsers: findAllUsers,
            search: search,
            login: login,
            logout: logout,
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

        function findAllUsers() {
            var url = "/project/api/user/";
            return $http.get(url);
        }

        function search(text) {
            var url = "/project/api/user/search/" + text;
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

        function logout() {
            var url = "/project/api/logout";
            return $http.post(url);
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