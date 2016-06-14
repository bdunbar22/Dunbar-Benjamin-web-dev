/**
 * Created by Ben on 5/29/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController)

    function RegisterController($location, $rootScope, UserService) {
        var vm = this;
        vm.register = register;

        function register(username, password, verifyPassword) {
            if(password != verifyPassword) {
                vm.error = "Could not verify password.";
                return false;
            }
            UserService
                .register(username, password)
                .then(function (resp) {
                    var user = resp.data;
                    $rootScope.currentUser = user;
                    $location.url("/user/" + user._id);
                },
                function(error) {
                    vm.error = error.data;
                    return false;
                });
        }
    }
})();