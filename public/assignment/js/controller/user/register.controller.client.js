/**
 * Created by Ben on 5/29/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController)

    function RegisterController($location, UserService) {
        var viewModel = this;
        viewModel.login = register;

        function register(username, password) {
            //TODO: create new user.
        }
    }
})();