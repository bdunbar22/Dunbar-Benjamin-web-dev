/**
 * Created by Ben on 5/24/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)

    function LoginController($location, UserService) {
        var viewModel = this;
        viewModel.login = login;

        function login(username, password) {
            var user = UserService.findUserByUsernameAndPassword(username, password);
            if(user) {
                $location.url("/user/" + user._id);
            }
            else {
                vm.error = "Could not match username and password.";
            }
        }
    }
})();