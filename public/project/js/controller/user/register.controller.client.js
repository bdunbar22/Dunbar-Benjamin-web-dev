/**
 * Created by Ben on 6/13/16.
 */

(function() {
    angular
        .module("BenProject")
        .controller("RegisterController", RegisterController)

    function RegisterController($location, UserService) {
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
                    var userId = resp.data._id;
                    $location.url("/user/" + userId);
                },
                function(error) {
                    vm.error = error.data;
                    return false;
                });
        }
    }
})();