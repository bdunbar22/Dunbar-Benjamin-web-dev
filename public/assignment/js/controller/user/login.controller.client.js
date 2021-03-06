/**
 * Created by Ben on 5/24/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)

    function LoginController($location, $rootScope, UserService) {
        var vm = this;
        vm.login = login;

        function login(username, password) {
            UserService
                .login(username, password)
                .then(function (resp) {
                    var user = resp.data;
                    if(user) {
                        $rootScope.currentUser = user;
                        $location.url("/user/" + user._id);
                    }
                    else {
                      vm.error = "Could not match username and password.";
                    }
                },
                function (error) {
                    vm.error = "Could not match username and password.";
                });
        }
    }
})();