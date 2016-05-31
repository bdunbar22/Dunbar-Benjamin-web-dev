/**
 * Created by Ben on 5/25/16.
 */

(function() {
    angular
        .module("BenProject")
        .controller("ProfileController", ProfileController);

    /**
     * At start retrieve user based on url uid parameter. Found in init function.
     */
    function ProfileController($routeParams, UserService) {
        var vm = this;
        var id = $routeParams["uid"];
        vm.updateUser = updateUser;

        function init() {
            vm.user = UserService.findUserById(id);
        }
        init();

        function updateUser() {
            vm.success = UserService.updateUser(id, vm.user);
        }
    }
})();