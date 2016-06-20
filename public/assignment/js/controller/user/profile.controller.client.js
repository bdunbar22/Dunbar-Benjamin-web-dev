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
    function ProfileController($routeParams, $location, $rootScope, UserService) {
        var vm = this;
        var id = $routeParams["uid"];
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.logout = logout;

        function init() {
            if(id) {
                UserService
                    .findUserById(id)
                    .then(function (resp) {
                        vm.user = resp.data;
                    });
            } else if($rootScope.currentUser) {
                vm.user = $rootScope.currentUser;
                id = vm.user._id;
            } else {
                $location.url("/login");
            }
        }
        init();

        function updateUser() {
            UserService
                .updateUser(id, vm.user)
                .then(function (resp) {
                    vm.success = "User successfully updated.";
                },
                function (error) {
                    vm.error = error.data;
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

        function logout() {
            UserService
                .logout()
                .then(
                    function() {
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    },
                    function() {
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    }
                );
        }
    }
})();