/**
 * Created by Ben on 6/13/16.
 */

(function() {
    angular
        .module("BenProject")
        .controller("PublicProfileController", PublicProfileController);

    /**
     * At start retrieve user based on url uid parameter. Found in init function.
     */
    function PublicProfileController($routeParams, $location, $rootScope, UserService) {
        var vm = this;
        var id = $routeParams["uid"];
        vm.followUser = followUser;

        function init() {
            UserService
                .findUserById(id)
                .then(function (resp) {
                    vm.user = resp.data;
                }, function (err) {
                    vm.error = err;
                });
            
            if($rootScope.currentUser) {
                vm.currentUser = $rootScope.currentUser;
            }
        }
        init();

        function followUser() {
            if(vm.user && vm.currentUser) {
                vm.user.followers.push(vm.currentUser._id);
                vm.currentUser.following.push(vm.user._id);
                UserService
                    .updateUser(vm.user._id, vm.user)
                    .then(
                        function() {
                            UserService
                                .updateUser(vm.currentUser._id, vm.currentUser);
                        },
                        function() {
                            vm.error = "You could not follow the user successfully.";
                        }
                    )
                    .then(
                        function() {
                            vm.message = "You have followed this user.";
                        },
                        function() {
                            vm.error = "You could not follow the user successfully.";
                        }
                    );
            } else {
                vm.error = "You are not logged in.";
            }
        }
    }
})();