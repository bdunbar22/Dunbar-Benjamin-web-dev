/**
 * Created by Ben on 5/25/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    /**
     * At start retrieve user based on url uid parameter. Found in init function.
     */
    function ProfileController($routeParams, $location, UserService) {
        var vm = this;
        var id = $routeParams["uid"];
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;

        function init() {
            UserService
                .findUserById(id)
                .then(function (resp) {
                    vm.user = resp.data;
                });
        }
        init();

        function updateUser() {
            UserService
                .updateUser(id, vm.user)
                .then(function (resp) {
                    vm.success = "User successfully updated.";
                },
                function (error) {
                    vm.error = error;
                });
        }

        function deleteUser() {
            UserService
                .deleteUser(id)
                .then(function (resp) {
                    $location.url("/login");
                },
                function (error) {
                    vm.error = error.data;
                });
        }
    }
})();