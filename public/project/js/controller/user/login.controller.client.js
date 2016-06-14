/**
 * Created by Ben on 6/13/16.
 */

(function() {
    angular
        .module("BenProject")
        .controller("LoginController", LoginController)

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(username, password) {
            UserService
                .login(username, password)
                .then(function (resp) {
                    var user = resp.data;
                    if(user) {
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