/**
 * Created by Ben on 5/24/16.
 */

(function() {
    angular
        .module("BenProject")
        .controller("LoginController", LoginController)

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(username, password) {
            var user = UserService.findUserByCredentials(username, password);
            if(user) {
                $location.url("/user/" + user._id);
            }
            else {
                vm.error = "Could not match username and password.";
            }
        }
    }
})();